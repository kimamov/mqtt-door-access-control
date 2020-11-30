import * as mqtt from 'mqtt'
import { getRepository, Repository } from "typeorm"
import { Event } from '../entity/Event'
import { NewKey } from '../entity/NewKey'
import { Reader } from "../entity/Reader"

export let client = null

export const setupMqtt = () => {

    client = mqtt.connect({
        host: "151.252.57.69",
        port: "1883",
        clientId: "server_" + Date.now(),

    })
    /* client = mqtt.connect({
        host: "localhost",
        port: "1883",
        clientId: "15152411531",

    }) */

    client.on("error", (err) => console.log(err))
    client.on('connect', function () {

        client.subscribe('devnfc/#', function (err) {

        })
        client.subscribe('devnfc', function (err) {
            if (!err) {
                /* console.log("was called")
                client.publish("devnfc/sync", JSON.stringify({
                    type: "heartbeat",
                    ip: "test",
                    time: 1515151351,
                    door: "delete this"
                })) */
            }
        })
    })
    client.on('close', function () {
        console.log('mqtt closed');
    });

    client.on('offline', function () {
        console.log('offline');
    });

    client.on('reconnect', function () {
        console.log('reconnect');
    });

    client.on('message', messageHandler)
}
/* 
var person = new Object();
person.cmd        = "adduser";
person.doorip     = flow.get("doorip");
person.uid        = msg.payload.uuid;
person.user       = msg.payload.user;
person.acctype    = msg.payload.acctype;
person.validuntil = msg.payload.validuntil;

msg.payload = person;

return msg;
 */

function messageHandler(topic: string, message: Buffer) {
    // message is Buffer
    const messageString = message.toString()
    console.log(messageString)
    try {
        const messageJSON = JSON.parse(messageString)

        console.log(topic)
        console.log(messageJSON)

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
                handleAccessAndEvent(messageJSON);
                break;
            case "devnfc/accesslist":
            case "/devnfc/accesslist":
                handleDoorKeyList(messageJSON);
                break;
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
        const keyRepository: Repository<Reader> = getRepository(Reader);
        const reader = await keyRepository.create({
            ip: ip,
            lastPing: time,
            readerName: door
        });
        const result = await keyRepository.save(reader)
        console.log(result)
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
    if (messageJSON.type === "event") return handleDoorEvent(messageJSON)
    if (messageJSON.type === "access") {
        return messageJSON.isKnown ? handleKnownKey(messageJSON) : handleUnknownKey(messageJSON)
    }

}

async function handleDoorEvent(messageJSON) {
    /* devnfc / send
    {
        type: 'WARN',
            src: 'websrv',
                desc: 'New login attempt',
                    data: '192.168.178.21',
                        time: 1601410372,
                            cmd: 'event',
                                door: 'esp-rfid'
    } */
    try {
        // store all incoming events in the database
        const eventRepository: Repository<Event> = getRepository(Event);

        const result = await eventRepository.save({
            data: messageJSON.data,
            type: messageJSON.type,
            src: messageJSON.src,
            time: messageJSON.time,
            door: messageJSON.door,
            description: messageJSON.desc
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

async function handleKnownKey(messageJSON) {

}

async function handleUnknownKey(messageJSON) {

    try {
        console.log(messageJSON)
        const { uid, type, isknown, username, door, time } = messageJSON;
        const keyRepository: Repository<NewKey> = getRepository(NewKey);
        const key = await keyRepository.create({
            uuid: uid,
            name: username,
            door: door,
            time: time
        });
        const result = await keyRepository.save(key)
        console.log(result)
        /* log success as event in database */
    } catch (error) {
        /* log failure as event in database */
        console.log(error)
    }
}

async function handleDoorKeyList(messageJSON) {
    /* devnfc / send
    {
        type: 'WARN',
            src: 'websrv',
                desc: 'New login attempt',
                    data: '192.168.178.21',
                        time: 1601410372,
                            cmd: 'event',
                                door: 'esp-rfid'
    } */
    try {
        // store all incoming events in the database
        const eventRepository: Repository<Event> = getRepository(Event);

        const result = await eventRepository.save({
            data: messageJSON.data,
            type: messageJSON.type,
            src: messageJSON.src,
            time: messageJSON.time,
            door: messageJSON.door,
            description: messageJSON.desc
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

function syncToReader(readerIp: string, key) {
    // sync single key to target reader
}

function syncAllToReader(readerIp: string) {
    // sync all keys to target reader
}

function syncAllReaders() {

}



