import { getRepository, Repository } from "typeorm";
import { AccessLog } from "../entity/AccessLog";
import { Request, Response } from "express"


export async function getAllAccesses(req: Request, res: Response) {
    try {
        const accessRepository: Repository<AccessLog> = getRepository(AccessLog);
        const result = await accessRepository.find()
        res.set('Content-Range', `key 0-${result.length}/${result.length}`)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}