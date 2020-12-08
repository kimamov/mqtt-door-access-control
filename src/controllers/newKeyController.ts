import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { NewKey } from "../entity/NewKey"
import getList from "../util/getList"

export async function getNewKeys(req: Request, res: Response) {
    getList(getRepository(NewKey), req, res)
}