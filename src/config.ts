import * as session from 'express-session';



export const sessionParser = session({
    secret: process.env.SESSION_SECRET || "ayyyyyyy",
    resave: true,
    saveUninitialized: true,
    /* cookie: {
        sameSite: "none",
        secure: true
    } */
})


export const mqttConfig={
    host: process.env.MQTT_HOST || "localhost",
    port: process.env.MQTT_PORT || "1883",
    clientId: "server_" + Date.now() +"_"+ Math.random(),
    ...process.env.MQTT_PASSWORD && {password: process.env.MQTT_PASSWORD},
}