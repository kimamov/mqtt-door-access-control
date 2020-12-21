import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { NewKey } from "../entity/NewKey"
import getList from "../util/getList"

export async function getNewKeys(req: Request, res: Response) {
    getList(getRepository(NewKey), req, res)
}


export async function getNewKey(req: Request, res: Response){
    try {
        const result=await getRepository(NewKey).findOne(req.params.id);
        if(!result) return res.status(404).send({message: `could not find unknown key with id: ${req.params.id}`})
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function editNewKey(req: Request, res: Response){
    try {
        const result=await getRepository(NewKey).save(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function deleteNewKey(req: Request, res: Response){
    try {
        const result=await getRepository(NewKey).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}