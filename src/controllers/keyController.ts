import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Key } from "../entity/Key"
import getList from "../util/getList";
import { NewKey } from "../entity/NewKey";

export async function addKey(req: Request, res: Response) {
    try {
        const {newkey_id, uid, name, validUntil, isOneTimeCode, acctype, acctype2, acctype3, acctype4}=req.body;
        let realUid=uid;
        if(newkey_id){
            const newKeyRepo: Repository<NewKey>=getRepository(NewKey);
            const newKey=await newKeyRepo.findOne(newkey_id);
            if(newKey){ // if there is a newkey with that id use its uid and remove it afterwards since its not new now
                realUid=newKey.uid;
                await newKeyRepo.delete({id: newKey.id});
            }
        }
        const keyRepository: Repository<Key> = getRepository(Key);
        const key = await keyRepository.create({
            uid: realUid,
            name: name,
            validUntil: validUntil,
            isOneTimeCode: isOneTimeCode? true : false,
            acctype: acctype || 1,
            acctype2: acctype2 || 0,
            acctype3: acctype3 || 0,
            acctype4: acctype4 || 0
        });
        const result = await keyRepository.save(key)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}



export async function getKeys(req: Request, res: Response) {
    getList(getRepository(Key), req, res)
}

export async function getKey(req: Request, res: Response){
    try {
        const keyResult=await getRepository(Key).findOne(req.params.id, {relations: ["readers"]});
        if(!keyResult) return res.status(404).send({message: `could not find key with id: ${req.params.id}`})
        return res.send(keyResult);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function editKey(req: Request, res: Response){
    try {
        const result=await getRepository(Key).save(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function deleteKey(req: Request, res: Response){
    try {
        const result=await getRepository(Key).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

/* 
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

} */


export async function getKeysByDoor(req: Request, res: Response) {

}