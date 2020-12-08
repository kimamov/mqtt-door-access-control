import { getRepository, Repository } from "typeorm";
import { AccessLog } from "../entity/AccessLog";
import { Request, Response } from "express"
import { getList } from "../util/getList";




export function getAccesses(req: Request, res: Response) {
    getList(getRepository(AccessLog), req, res)
}