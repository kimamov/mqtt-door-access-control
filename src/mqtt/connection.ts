import * as mqtt from 'mqtt'
import { getRepository, Repository } from "typeorm"
import { Reader } from "../entity/Reader"

export let client = null

export const setupMqtt = () => {

    client = mqtt.connect({
        host: "127.0.0.1",
        port: "1883",
        clientId: "1515134"
    })

    client.on("error", (err) => console.log(err))
    client.on('connect', function () {
        client.subscribe('presence', function (err) {
            /* if (!err) {
                client.publish('presence', 'Hello mqtt')
            } */
        })
        client.subscribe('devnfc/#', function (err) {
            /* if (!err) {
                client.publish('devnfc/random/wow', 'test')
            } */
        })
        client.subscribe('devnfc', function (err) {
            if (!err) {
                /* client.publish('devnfc', JSON.stringify({
                    cmd: "adduser",
                    doorip: "192.168.178.47",
                    uid: "1234567890",
                    user: "kantemirbb",
                    acctype: "1",
                    validuntil: 2145914800
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
    client.publish('devnfc/random/wow', 'test')

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
    try {
        const messageJSON = JSON.parse(messageString)
        /* console.log(topic)
        console.log(messageJSON) */
        console.log(topic)
        console.log(messageJSON)

        // handle different topics
        switch (topic) {
            case "devnfc":
                handleDevNFCMessages(messageJSON);
                break;
            case "devnfc/sync":
                handleHeartBeat(messageJSON)
                break;
            default:
                console.log(messageJSON)
                console.warn("there is no handler for this topic either create one or consider unsubscribing from it");
                break;
        }

    } catch (error) {
        console.log(error)
    }
}

async function handleHeartBeat(messageJSON) {
    console.log(messageJSON)
    try {
        const keyRepository: Repository<Reader> = getRepository(Reader);
        const reader = await keyRepository.create({
            ip: messageJSON.ip,
            lastPing: messageJSON.time,
            doorname: messageJSON.door
        });
        const result = await keyRepository.save(reader)
        console.log(result)
        console.log("succesfully created reader")
        /* client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: "192.168.178.47",
            uid: "1234567890",
            user: "kantemirbb",
            acctype: "1",
            validuntil: 2145914800
        })) */
        client.publish("devnfc", JSON.stringify({
            cmd: "getuser",
            doorip: "192.168.178.47",
        }))
    } catch (error) {

        console.log(error)
    }
}

async function handleDoorConnected(messageJSON) {
    console.log(messageJSON)
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

function syncToReader(readerIp: string, key) {
    // sync single key to target reader
}

function syncAllToReader(readerIp: string) {
    // sync all keys to target reader
}

function syncAllReaders() {

}



