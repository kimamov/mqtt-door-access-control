import {Request} from 'express'


export  default function optionsFromReqQuery(req: Request){
    const [sortField="id", sortDirection="DESC"]=JSON.parse(req.query.sort as string);
    const [skip=0, take=9]=JSON.parse(req.query.range as string);
    return{
        take,
        skip,
        order: {[sortField]: sortDirection}
    };
}