import * as mqtt from 'mqtt';
import { mqttConfig } from '../config';
import messageHandler from './handlers'

export let client = null

export const setupMqtt = () => {
    client = mqtt.connect(mqttConfig)


    client.on("error", (err) => console.log(err))
    client.on('connect', function () {
        client.subscribe('devnfc/#', function (err) {
            
        })
        client.subscribe('devnfc', function (err) {
            if (!err) {
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




