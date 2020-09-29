import { getRepository, Repository } from "typeorm";
import { Accesslog } from "../entity/Accesslog";
import { Request, Response } from "express"


export async function getAllAccesses(req: Request, res: Response) {
    try {
        const accessRepository: Repository<Accesslog> = getRepository(Accesslog);
        const result = await accessRepository.find()
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}