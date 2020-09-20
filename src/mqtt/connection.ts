import * as mqtt from 'mqtt'

export let client = null

export const setupMqtt = () => {

    client = mqtt.connect({
        host: "127.0.0.1",
        port: "1883"
    })
    client.on("error", (err) => console.log(err))
    client.on('connect', function () {
        client.subscribe('presence', function (err) {
            if (!err) {
                client.publish('presence', 'Hello mqtt')
            }
        })
        client.subscribe('test', function (err) {
            if (!err) {
                client.publish('asd', 'test')
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(topic)
        console.log(message.toString())
        client.end()
    })
}


