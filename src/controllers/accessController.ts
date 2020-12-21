import { getRepository, Repository } from "typeorm";
import { AccessLog } from "../entity/AccessLog";
import { Request, Response } from "express"
import { getList } from "../util/getList";




export function getAccesses(req: Request, res: Response) {
    getList(getRepository(AccessLog), req, res)
}


export async function getAccess(req: Request, res: Response){
    try {
        const result=await getRepository(AccessLog).findOne(req.params.id);
        if(!result) return res.status(404).send({message: `could not find access log with id: ${req.params.id}`})
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function editAccess(req: Request, res: Response){
    try {
        const result=await getRepository(AccessLog).save(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function deleteAccess(req: Request, res: Response){
    try {
        const result=await getRepository(AccessLog).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}