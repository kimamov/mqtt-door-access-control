import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { NewKey } from "../entity/NewKey"
import optionsFromReqQuery from "../util/optionsFromQuery";

export async function getNewKeys(req: Request, res: Response) {
    try {
        console.log(req.query)
        const repo: Repository<NewKey> = getRepository(NewKey);
        const [result, total] = await repo.findAndCount(optionsFromReqQuery(req))
        res.set('Content-Range', `key 0-${result.length}/${total}`)
        res.send(result)
    } catch (error) {
        res.status(404).send("could not find any items");
    }

}