import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express"
import { Event } from "../entity/Event";
import getList from "../util/getList";


export function getEvents(req: Request, res: Response) {
    getList(getRepository(Event), req, res)
}

export async function getEvent(req: Request, res: Response){
    try {
        const result=await getRepository(Event).findOne(req.params.id);
        if(!result) return res.status(404).send({message: `could not find event with id: ${req.params.id}`})
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function editEvent(req: Request, res: Response){
    try {
        const result=await getRepository(Event).save(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function deleteEvent(req: Request, res: Response){
    try {
        const result=await getRepository(Event).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}