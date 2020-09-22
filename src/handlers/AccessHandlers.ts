import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Key } from "../entity/Key"

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