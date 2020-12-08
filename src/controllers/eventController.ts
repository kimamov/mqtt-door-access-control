import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express"
import { Event } from "../entity/Event";
import optionsFromReqQuery from "../util/optionsFromQuery";


export async function getEvents(req: Request, res: Response) {
    try {
        const repo: Repository<Event> = getRepository(Event);
        const [result, total] = await repo.findAndCount(optionsFromReqQuery(req))
        res.set('Content-Range', `key 0-${result.length}/${total}`)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}