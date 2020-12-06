import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { NewKey } from "../entity/NewKey"

export async function getAllNewKeys(req: Request, res: Response) {
    try {
        console.log(req.query)
        const keyRepository: Repository<NewKey> = getRepository(NewKey);
        const keys = await keyRepository.find()
        res.set('Content-Range', `key 0-${keys.length}/${keys.length}`)
        res.send(keys)
    } catch (error) {
        res.status(404).send("could not find any items");
    }

}