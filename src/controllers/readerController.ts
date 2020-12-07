import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import { Key } from "../entity/Key";
import { ReaderToKey } from "../entity/ReaderToKey";
import optionsFromReqQuery from "../util/optionsFromQuery";

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
    console.log("was called")
    const { doorName } = req.params
    if (!doorName) return res.status(404).send({
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

export async function getReaders(req: Request, res: Response) {
    try {
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const result = await readerRepository.find(optionsFromReqQuery(req))
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
        if (!(body.readerId && body.keyId)) throw "invalid request body"
        // check if reader with that ip exists
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const readerResult = await readerRepository.findOneOrFail({ readerName: body.readerName })
        if (!readerResult) throw "no door found"
        // check if key with that id exists
        const keyResult: Key = await getRepository(Key).findOneOrFail({ id: body.keyId })
        if (!keyResult) throw "no key found"
        // create connection between reader and key
        const readerToKeyRepo: Repository<ReaderToKey> = getRepository(ReaderToKey)
        const readerToKey: ReaderToKey = await readerToKeyRepo.create({
            keyId: body.keyId,
            readerId: body.readerId
        })
        
        await readerToKeyRepo.save(readerToKey);
        client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: readerResult.ip,
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