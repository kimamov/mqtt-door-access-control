import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express"
import { Event } from "../entity/Event";
import optionsFromReqQuery from "../util/optionsFromQuery";


export async function getEvents(req: Request, res: Response) {
    try {
        const eventRepository: Repository<Event> = getRepository(Event);
        const result = await eventRepository.find(optionsFromReqQuery(req))
        res.set('Content-Range', `key 0-${result.length}/${result.length}`)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}