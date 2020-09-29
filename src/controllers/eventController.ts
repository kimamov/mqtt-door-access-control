import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express"
import { Event } from "../entity/Event";


export async function getAllEvents(req: Request, res: Response) {
    try {
        const eventRepository: Repository<Event> = getRepository(Event);
        const result = await eventRepository.find()
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
}