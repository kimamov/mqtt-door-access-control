import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

// create typeorm connection
createConnection().then(connection => {
    const userRepository = connection.getRepository(User);

    // create and setup express app
    const app = express();
    app.use(express.json());

    // register routes

    app.get("/users", async function (req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
    });

    app.get("/users/:id", async function (req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/users", async function (req: Request, res: Response) {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.put("/users/:id", async function (req: Request, res: Response) {
        const user = await userRepository.findOne(req.params.id);
        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.delete("/users/:id", async function (req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(3000);
});