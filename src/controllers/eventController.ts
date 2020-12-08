import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express"
import { Event } from "../entity/Event";
import getList from "../util/getList";


export function getEvents(req: Request, res: Response) {
    getList(getRepository(Event), req, res)
}