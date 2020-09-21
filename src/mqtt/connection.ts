import * as mqtt from 'mqtt'

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
            if (!err) {
                client.publish('presence', 'Hello mqtt')
            }
        })
        client.subscribe('devnfc/#', function (err) {
            if (!err) {
                client.publish('devnfc/random/wow', 'test')
            }
        })
        client.subscribe('devnfc', function (err) {
            if (!err) {
                client.publish('devnfc', JSON.stringify({
                    cmd: "adduser",
                    doorip: "192.168.178.47",
                    uid: "1234567890",
                    user: "kantemirbb",
                    acctype: "1",
                    validuntil: 2145914800
                }))
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

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(topic)
        console.log(message.toString())
        //client.end()
    })
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

function handleDoorConnected() {

}

