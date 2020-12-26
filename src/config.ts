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


export const readerConfig={
    deleteTime: 2000,
    syncTime: 300,
    readerListWaitTime:  2000,
}

export const serverConfig={
    httpPort: process.env.HTTP_PORT || 5000,
    httpsPort: process.env.HTTP_PORT || 443,
    sslCertPath: process.env.SSL_CERT_PATH,
    sslKeyPath: process.env.SSL_KEY_PATH,
    clientPath: "../client/build/index.html",
    staticFilesPath: "../client/build"
}