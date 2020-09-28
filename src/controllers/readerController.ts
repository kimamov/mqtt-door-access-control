import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"


export async function addKey(req: Request, res: Response) {
    try {
        const keyRepository: Repository<Reader> = getRepository(Reader);
        const reader = await keyRepository.create({

        });
        const result = await keyRepository.save(reader)
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}