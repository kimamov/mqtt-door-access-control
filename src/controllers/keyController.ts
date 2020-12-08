import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Key } from "../entity/Key"
import { client } from "../mqtt/connection";
import optionsFromReqQuery from "../util/optionsFromQuery";

export async function addKey(req: Request, res: Response) {
    try {
        const keyRepository: Repository<Key> = getRepository(Key);
        const key = await keyRepository.create(req.body);
        const result = await keyRepository.save(key)
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}



export async function getKeys(req: Request, res: Response) {
    try {
        const repo: Repository<Key> = getRepository(Key);
        const [result, total] = await repo.findAndCount(optionsFromReqQuery(req))
        res.set('Content-Range', `key 0-${result.length}/${total}`)
        res.send(result)
    } catch (error) {
        res.status(404).send("could not find any items");
    }

}


export async function syncKey(req: Request, res: Response) {
    try {
        // check if id was provided with the request
        const id = req.body.id;
        if (!id) throw "you need to provide the an id"
        // search for the key inside the database
        const keyRepository: Repository<Key> = getRepository(Key);
        const result: Key = await keyRepository.findOne({ id: id })
        if (!result) return res.status(404).send({
            messages: "could not find item with the provided id: " + id
        })
        // throw if non was found
        if (!client.connected) throw "mqtt client lost connection please try again later"

        // send the retrieved key to the device
        client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: "192.168.178.47",
            uid: result.uid,
            user: result.name,
            acctype: "1",
            validuntil: result.validUntil
        }))

        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}


export async function getKeysByDoor(req: Request, res: Response) {

}