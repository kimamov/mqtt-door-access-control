import {  getRepository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import { Key } from "../entity/Key";
import getList from "../util/getList";
import dateToUnix from "../util/dateToUnix";
import { ReaderKey } from "../entity/ReaderKey";
import { Lock } from "../entity/Lock";
import { Building } from "../entity/Building";
import { Apartment } from "../entity/Apartment";







export async function getApartments(req: Request, res: Response) {
    getList(getRepository(Apartment), req, res)
}

export async function getApartment(req: Request, res: Response){
    try {
        const {id}=req.params;
        const result = await getRepository(Apartment).findOne(id)
        
        if(!result){
            return res.status(404).send({message: `could not find building with the provided id ${id}`})
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "server error"})
    }
}


export async function createApartment(req: Request, res: Response) {
    try {
        const result=await getRepository(Apartment).save(req.body);
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}

export async function editBuilding(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const readerId=req.params.id;
        if(readerId === undefined){
            throw "please provide a valid reader id"
        }
        const { body } = req;
        if (!body.readerKeys || !Array.isArray(body.readerKeys)){
            return res.status(400).send({error: "invalid request an array readerKeys is required"})
        }
        
        // there has to be a better option then deleting all the relationships before adding new but this should do for now
        getRepository(ReaderKey)
            .createQueryBuilder()
            .delete()
            .from(ReaderKey)
            .where("readerId = :readerId", {readerId: readerId})
            .execute();
        
        // check if reader with that ip exists
        const readerRepo=getRepository(Reader)
        const readerResult = await readerRepo.findOne(readerId, {relations: ["readerKeys"]})

        if (!readerResult) throw "no door found"

        /* if(body.readerName){
            readerResult.readerName=body.readerName;
        } */
        readerResult.acctypeName=body.acctypeName || "";
        readerResult.acctype2Name=body.acctype2Name  || "";
        readerResult.acctype3Name=body.acctype3Name  || "";
        readerResult.acctype4Name=body.acctype4Name  || "";
        readerResult.acctype5Name=body.acctype5Name  || "";
        readerResult.acctype6Name=body.acctype6Name  || "";

        readerResult.readerKeys=body.readerKeys;

        await readerRepo.save(readerResult)

        return res.send(readerResult)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to update keys on reader"
        })
    }
}







