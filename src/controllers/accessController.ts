import { getRepository, Repository, Entity } from "typeorm";
import { AccessLog } from "../entity/AccessLog";
import { Request, Response } from "express"
import optionsFromReqQuery from "../util/optionsFromQuery";



export async function getItems<T>(repo: Repository<T>, req: Request){
    const queryOptions=optionsFromReqQuery(req);
    console.log({queryOptions})
    return repo.find(queryOptions);
}


export async function getAccesses(req: Request, res: Response) {
    try {
        console.log(req.query)
        //const result=await getItems(getRepository(AccessLog), req)
        const result=await getRepository(AccessLog).find(optionsFromReqQuery(req));
        res.set('Content-Range', `key 0-${result.length}/${result.length}`)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}