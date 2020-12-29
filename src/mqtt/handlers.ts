import { getRepository, Repository } from "typeorm"
import { AccessLog } from '../entity/AccessLog'
import { Event } from '../entity/Event'
import { Key } from "../entity/Key"
import { NewKey } from '../entity/NewKey'
import { Reader } from "../entity/Reader"
import { ReaderKey } from "../entity/ReaderKey"
import dateFromUnix from "../util/dateFromUnix"




export default function messageHandler(topic: string, message: Buffer) {
    // message is Buffer
    const messageString = message.toString()
    /* console.log(messageString) */
    try {
        const messageJSON = JSON.parse(messageString)

        /* console.log(topic)
        console.log(messageJSON) */


        // handle different topics
        switch (topic) {
            case "devnfc":
            case "/devnfc":
                handleDevNFCMessages(messageJSON);
                break;
            case "devnfc/sync":
            case "/devnfc/sync":
                handleHeartBeat(messageJSON)
                break;
            case "devnfc/send":
            case "/devnfc/send":
                //handleDoorKeyList(messageJSON);
                handleAccessAndEvent(messageJSON);
                break;
            case "devnfc/accesslist":
            /* case "/devnfc/accesslist":
                handleDoorKeyList(messageJSON);
                break; */
            case "devnfc/#":
            case "/devnfc/#":
                console.log("messageJSON")
            default:
                /* console.log(messageJSON) */
                console.warn("there is no handler for this topic either create one or consider unsubscribing from it");
                break;
        }

    } catch (error) {
        console.log("error parsing following content as json: " + messageString)
        console.log(error)
        // maybe handle non json messages here but rather dont handle them :)
        //console.log(error)
    }
}

async function handleHeartBeat(messageJSON) {
    // store reader in database if exists update it (mostly update lastPing)
    try {
        if (!(messageJSON.type === "heartbeat")) throw "invalid type expected heartbeat"
        if (!(messageJSON.ip && messageJSON.time && messageJSON.door)) throw "required fileds are missing"
        const { ip, time, door } = messageJSON;
        
        const readerRepo: Repository<Reader> = getRepository(Reader);
        /* check if reader already exists */
        const foundReader=await readerRepo.findOne({readerName: door});
        const lastPingDateTime=dateFromUnix(time);
        if(foundReader){
            /* if there already is a reader with that name and ip update it */
            foundReader.lastPing=lastPingDateTime;
            const result=await readerRepo.save(foundReader);
            //console.log(result)
        }else {
            /* otherwise create a new one */
            const reader = await readerRepo.create({
                ip: ip,
                lastPing: lastPingDateTime,  // transform unix timestamp to date
                readerName: door
            });
            const result = await readerRepo.save(reader)
            /* console.log(result)
            console.log("new reader but wont create it") */
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function handleDoorConnected(messageJSON) {
    /* console.log(messageJSON) */
    /* {
        type: 'boot',
        time: 1601312104,
        'Wifi SSID': 'FRITZ!Box 7362 SL',
        'Local IP': '192.168.178.47'
    } */
    /* try {
        const keyRepository: Repository<Reader> = getRepository(Reader);
        const reader = await keyRepository.create({
            ip: messageJSON["Local IP"],
            lastPing: messageJSON.time,
        });
        const result = await keyRepository.save(reader)
        console.log(result)
        console.log("succesfully created reader")
    } catch (error) {

        console.log(error)
    } */

}

function handleDevNFCMessages(messageJSON) {
    switch (messageJSON.type) {
        case "boot":
            // handle new or known reader connecting
            handleDoorConnected(messageJSON)
            break;
    }
}

function handleAccessAndEvent(messageJSON) {
    if (messageJSON.cmd === "event") handleDoorEvent(messageJSON)
    else if (messageJSON.type === "access") {
        messageJSON.isKnown = messageJSON.isKnown === "true"
        messageJSON.isKnown  ? handleKnownKey(messageJSON) : handleUnknownKey(messageJSON)
        if(messageJSON.cmd==="log"){
            logAccess(messageJSON);
        }
    }

}

async function handleDoorEvent(messageJSON) {

    try {
        // store all incoming events in the database
        const eventRepository: Repository<Event> = getRepository(Event);
        const result = await eventRepository.save({
            data: messageJSON.data,
            type: messageJSON.type,
            src: messageJSON.src,
            time: dateFromUnix(messageJSON.time),  // transform unix timestamp to datemessageJSON.time,
            door: messageJSON.door,
            description: messageJSON.desc
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

async function handleKnownKey(messageJSON) {
    console.log(`known key with the UID: ${messageJSON.uid} accessed door ${messageJSON.door}`);
    try {
        const readerResult=await getRepository(Reader).findOneOrFail({readerName: messageJSON.door}, {relations: ["readerKeys", "readerKeys.key"]});
        
        // update onetime key
        // find a key with the provided uid on the reader
        const foundReaderKey: ReaderKey | undefined=readerResult.readerKeys.find(result=>result.key.uid === messageJSON.uid);
        if(!foundReaderKey) throw Error("could not find key with the provided uid on reader")
        const currentDate=new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 30); // increase the date by 30 minutes
        foundReaderKey.key.validUntil=currentDate; // set the key to be valid for 30 more minutes from now
        
        const updatedKeyResult=await getRepository(Key).save(foundReaderKey.key);
        console.log(updatedKeyResult);
    } catch (error) {
        console.log(error);
    }

}

async function logAccess(messageJSON) {
    try {

        console.log(messageJSON)
        const { uid, username, door, time, isKnown, type, access } = messageJSON;
        // every accessLog needs to be connected to a reader
        // try to find the reader
        const readerResult=await getRepository(Reader).findOneOrFail({readerName: door});

        const accessRepo: Repository<AccessLog> = getRepository(AccessLog);
        const key = await accessRepo.create({
            uid: uid,
            name: username,
            reader: readerResult,
            door: door,
            time: dateFromUnix(time),
            isKnown: isKnown || false,
            type: type,
            access: access,
        });
        const result = await accessRepo.save(key)
        console.log(result)
        /* log success as event in database */
    } catch (error) {
        /* log failure as event in database */
        console.log(error)
    }
}

async function handleUnknownKey(messageJSON) {
  
    try {
        const { uid, username, door, time } = messageJSON;
        const readerResult=await getRepository(Reader).findOneOrFail({readerName: door});
        const newKeyRepo: Repository<NewKey> = getRepository(NewKey);
        const key = await newKeyRepo.create({
            uid: uid,
            name: username,
            door: door,
            reader: readerResult,
            time: dateFromUnix(time),  // transform unix timestamp to date
        });
        const result = await newKeyRepo.save(key)
        console.log(result)
        /* log success as event in database */
    } catch (error) {
        /* log failure as event in database */
        console.log(error)
    }
}



async function handleDoorKeyListOld(messageJSON) {

    const keyObject={
        data: messageJSON.data,
        type: messageJSON.type,
        src: messageJSON.src,
        time: dateFromUnix(messageJSON.time),
        door: messageJSON.door,
        description: messageJSON.desc
    }
    try {
        // store all incoming events in the database
        const eventRepo: Repository<Event> = getRepository(Event);

        const result = await eventRepo.save({
            data: messageJSON.data,
            type: messageJSON.type,
            src: messageJSON.src,
            time: dateFromUnix(messageJSON.time),
            door: messageJSON.door,
            description: messageJSON.desc
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}



