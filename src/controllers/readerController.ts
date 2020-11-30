import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import { Key } from "../entity/Key";
import { ReaderToKey } from "../entity/ReaderToKey";

/* export async function addKey(req: Request, res: Response) {
    try {
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const reader = await readerRepository.create({

        });
        const result = await readerRepository.save(reader)
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

} */


export async function getReaderKeys(req: Request, res: Response) {
    // tell the reader to send us all keys that are currently stored on it
    const { doorid } = req.params
    if (!doorid) return res.status(404).send({
        message: "please provide an id"
    })
    /* TODO: get the reader from the doorid then use its ip to the command */
    client.publish("devnfc", JSON.stringify({
        /* cmd: "getuser", */
        cmd: "listusr",
        doorip: "192.168.178.47",
    }))
    res.send("success")

}

export async function getAllReaders(req: Request, res: Response) {
    try {
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const result = await readerRepository.find()
        res.set('Content-Range', `key 0-${result.length}/${result.length}`)

        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}



export async function getMyReaderKeys(req: Request, res: Response) {
    try {
        const readerRepository: Repository<Reader> = getRepository(Reader);
        /* const result = await readerRepository.findOne({ relations: ["readerToKeys"] })
        if (result) {
            const da = await result.readerToKeys
            console.log(da)
        } */
        const result = await readerRepository
            .createQueryBuilder("reader")
            .leftJoinAndSelect("reader.readerToKeys", "key")
            .getMany();
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error
        })
    }
}


export async function addReaderKeys(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const { body } = req;
        if (!(body.doorIp && body.keyId)) throw "invalid request body"
        // check if reader with that ip exists
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const readerResult = readerRepository.findOneOrFail({ ip: body.doorIp })
        if (!readerResult) throw "no door found"
        // check if key with that id exists
        const keyResult: Key = await getRepository(Key).findOneOrFail({ id: body.keyId })
        if (!keyResult) throw "no key found"
        // create connection between reader and key
        const readerToKeyRepo: Repository<ReaderToKey> = getRepository(ReaderToKey)
        const readerToKey: ReaderToKey = await readerToKeyRepo.create({
            keyId: body.keyId,
            readerIp: body.doorIp,

        })
        const linkResult = await readerToKeyRepo.save(readerToKey);
        client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: linkResult.readerIp,
            uid: keyResult.uid,
            user: keyResult.name,
            acctype: keyResult.acctype,
            acctype2: keyResult.acctype2,
            acctype3: keyResult.acctype3,
            acctype4: keyResult.acctype4,
            validuntil: 2145914800
        }))
        res.send({
            message: "successfully created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to create link"
        })
    }
}