import {  getRepository } from "typeorm"
import { Request, Response } from "express"
import { Lock } from "../entity/Lock";
import { Building } from "../entity/Building";
import { Apartment } from "../entity/Apartment";
import { ReaderKey } from "../entity/ReaderKey";







export async function getLockKeys(req: Request, res: Response) {
    try {
        const filter=JSON.parse(req.query.filter as string);
        if(!filter.id) return res.send([]);
        const lockId=filter.id;
        const lock=await getRepository(Lock).findOneOrFail(lockId);

        let skip=0;
        let take=0;
        if(req.query.range){
            const [first=0, last]=JSON.parse(req.query.range as string);
            skip=first;
            take=last - first;
        }

        const acctype=lock.slot<2? "acctype":`acctype${lock.slot}`
        const [lockKey, total]=await getRepository(ReaderKey).findAndCount({where: {
            readerId: lock.readerId,
            [acctype]: 1
        }/* , relations: ["key"] */})
        const lockKeyWithId=lockKey.map(key=>({
            ...key,
            id: key.keyId
        }))
        console.log(lockKeyWithId)
        const first=skip || 0;
        const last=first + take;

        const resultCount=lockKeyWithId.length;
        const realLastIndex = take ? Math.min(resultCount - 1 + first, last) : (resultCount - 1);

        res.set('Content-Range', `key ${first}-${realLastIndex}/${total}`)

        return res.send(lockKeyWithId);
    } catch (error) {
        res.status(500).send(error)
    }
}




export async function addLockKey(req: Request, res: Response) {
    try {

        const repo=getRepository(Lock);
        const lock=repo.create(req.body as Lock);

        if(lock.type==="Wohnungsschloss" && lock.apartmentId){
            lock.apartmentLock=await getRepository(Apartment).findOne(lock.apartmentId)
            lock.apartmentId=null;
        }else if(lock.type==="Gebäudeschloss" && lock.buildingId){
            lock.buildingLock=await getRepository(Building).findOne(lock.buildingId)
        }
        const result=await repo.save(lock);
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}


export async function editLockKeys(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const {building, apartment,reader,apartmentLock,buildingLock,...updateObject}=req.body

        if(updateObject.type==="Wohnungsschloss" && updateObject.apartmentId){
            updateObject.apartmentLock=await getRepository(Apartment).findOne(updateObject.apartmentId)
            updateObject.apartmentId=null;
        }else if(updateObject.type==="Gebäudeschloss" && updateObject.buildingId){
            updateObject.buildingLock=await getRepository(Building).findOne(updateObject.buildingId)
            //updateObject.buildingId=null;
        }
        const result=await getRepository(Lock).save(updateObject);
        res.send(result)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to update lock"
        })
    }
}


export async function deleteLockKey(req: Request, res: Response){
    try {
        const result=await getRepository(Lock).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}






