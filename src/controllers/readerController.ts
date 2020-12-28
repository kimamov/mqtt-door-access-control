import {  getRepository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import { Key } from "../entity/Key";
import getList from "../util/getList";
import dateToUnix from "../util/dateToUnix";
import { ReaderKey } from "../entity/ReaderKey";







export async function getReaders(req: Request, res: Response) {
    getList(getRepository(Reader), req, res)
}

export async function getReaderWithKeys(req: Request, res: Response){
    try {
        const {id}=req.params;
        const result = await getRepository(Reader).findOne(id, {relations: ["readerKeys", "readerKeys.key"]})
        
        if(!result){
            return res.status(404).send({message: `could not find reader with the provided id ${id}`})
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "server error"})
    }
}



export async function addReaderKeys(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const { body } = req;
        if (!(body.id && body.key_id)) throw "invalid request body"
        // check if reader with that ip exists
        const readerResult = await getRepository(Reader).findOneOrFail({ id: body.id})
        // check if key with that id exists
        const keyResult: Key = await getRepository(Key).findOneOrFail({ id: body.key_id })
        
        const readerKeyResult: ReaderKey=await getRepository(ReaderKey).save({
            readerId: readerResult.id,
            keyId: keyResult.id,
            acctype: body.acctype || 0,
            acctype2: body.acctype2 || 0,
            acctype3: body.acctype3 || 0,
            acctype4: body.acctype4 || 0
        })
        
        
        if(!client.connected){
            return res.status(500).send({error: "connection to the MQTT client was lost"})
        }
        client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: readerResult.ip,
            uid: keyResult.uid,
            user: keyResult.name,
            acctype: readerKeyResult.acctype,
            acctype2: readerKeyResult.acctype2,
            acctype3: readerKeyResult.acctype3,
            acctype4: readerKeyResult.acctype4,
            validuntil: dateToUnix(keyResult.validUntil)
        })) 

        return res.send({
            message: "successfully created"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: "failed to create link"
        })
    }
}

export async function editReaderKeys(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const readerId=req.params.id;
        if(readerId === undefined){
            throw "please provide a valid reader id"
        }
        const { body } = req;
        if (!body.readerKeys || !Array.isArray(body.readerKeys)){
            return res.status(400).send({error: "invalid request an array readerKeys is required"})
        }
        
        // there has to be a better option then deleting all the relationships before adding new but this should do for now
        getRepository(ReaderKey)
            .createQueryBuilder()
            .delete()
            .from(ReaderKey)
            .where("readerId = :readerId", {readerId: readerId})
            .execute();
        
        // check if reader with that ip exists
        const readerRepo=getRepository(Reader)
        const readerResult = await readerRepo.findOne(readerId, {relations: ["readerKeys"]})

        if (!readerResult) throw "no door found"

        /* if(body.readerName){
            readerResult.readerName=body.readerName;
        } */
        readerResult.acctypeName=body.acctypeName || "";
        readerResult.acctype2Name=body.acctype2Name  || "";
        readerResult.acctype3Name=body.acctype3Name  || "";
        readerResult.acctype4Name=body.acctype4Name  || "";

        readerResult.readerKeys=body.readerKeys;

        await readerRepo.save(readerResult)

        return res.send(readerResult)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to update keys on reader"
        })
    }
}







