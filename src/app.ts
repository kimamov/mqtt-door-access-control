if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { sessionParser } from './config'
import { setupMqtt } from './mqtt/connection'
import { serverConfig } from './config';


createConnection()
    .then(async (connection) => {
        // setup server once connection to the database is created
        const express = require("express");
        const cors = require("cors");
        const auth = require("./util/passportStrategies");
        const passport = require("passport");
        const routes = require("./routes/routes");
        const https = require("https");
        const http = require("http");
        const fs = require("fs");
        const path = require("path");


        const app = express();



        // setup express middlewares
        app.use(
            sessionParser
        );

        const clientAdress = process.env.CLIENT_ADRESS || "http://localhost:3000";
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
            connection.getRepository(User)
                .findOne(userId, { select: ['id', 'username'] })
                .then((data) => done(null, data))
                .catch((error) => done(error));
        });

        /* const { proxy } = require('rtsp-relay')(app);

        app.ws('/api', (ws, req) => {
            console.log("req.params")

        });

        app.ws('/api/stream', (ws, req) => {
            console.log("req.params")
            const path = req.query.path;
            console.log(path)
            return proxy({ url: path })(ws)
        });


        app.ws('/api/stream/:cameraAdress', (ws, req) => {
            console.log(req.params)
            return proxy({ url: `${req.params.cameraAdress}`, verbose: true })(ws)
        }); */


        // setup api routes
        app.use("/api", routes);

        // setup path for static files of react frontend
        app.use(express.static(path.join(__dirname, serverConfig.staticFilesPath)));

        // setup fall through path for react frontend entry file index.html
        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, serverConfig.clientPath));
        });


        //setup mqtt client
        setupMqtt();


        if (serverConfig.sslCertPath && serverConfig.sslKeyPath) {
            const httpsServer = https.createServer({
                key: fs.readFileSync(path.join(__dirname, serverConfig.sslKeyPath)),
                cert: fs.readFileSync(path.join(__dirname, serverConfig.sslCertPath))
            }, app)
            httpsServer.listen(serverConfig.httpsPort, (e) => {
                if (e) return console.log(e);
                console.log(`started listening for HTTPS requests on port ${serverConfig.httpsPort}`);
            });
        }

        const httpServer = http.createServer(app);
        httpServer.listen(serverConfig.httpPort, (e: Error) => {
            if (e) return console.log(e);
            console.log(`server listening on port ${serverConfig.httpPort}`);
        });

    })
    .catch((error) => console.log(error));
