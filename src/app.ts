if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import * as path from 'path';
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { sessionParser } from './config'
import {  setupMqtt } from './mqtt/connection'

console.log(process.env.MQTT_HOST)

if(!process.env.CLIENT_ADRESS){
    console.warn("please provide the url of the client for cors. Falling back to the default http://localhost:3000")
}
const clientAdress=process.env.CLIENT_ADRESS || "http://localhost:3000";


createConnection()
    .then(async (connection) => {
        // setup server once connection to the database is created
        const express = require("express");
        const cors = require("cors");
        const auth = require("./util/passportStrategies");
        const passport = require("passport");
        const routes = require("./routes/routes");

        const PORT = process.env.PORT || 5000;


        const app = express();

        app.set('view engine', 'ejs');

        // setup express middlewares
        app.use(
            sessionParser
        );
        app.use(
            cors({
                origin: [clientAdress],
                credentials: true,
                exposedHeaders: ['Content-Range']
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.json());
        app.use(express.urlencoded());
        //setup passport middlewares
        passport.use(auth);
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((userId, done) => {
            const user = connection.getRepository(User);
            user
                .findOne(userId, { select: ['id', 'username'] })
                .then((data) => done(null, data))
                .catch((error) => done(error));
        });


        //setup routes
        app.use("/api", routes);

        app.use(express.static(path.join(__dirname, 'build')));

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });

        //setup mqtt client
        setupMqtt();
        // express server listen on PORT
        app.listen(PORT, (e: Error) => {
            if (e) return console.log(e);
            console.log(`server listening on port ${PORT}`);
        });


    })
    .catch((error) => console.log(error));
