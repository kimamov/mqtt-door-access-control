import { getRepository } from "typeorm"
import { Request, Response } from "express"
import getList from "../util/getList";
import { Lock } from "../entity/Lock";
import { Building } from "../entity/Building";
import { Apartment } from "../entity/Apartment";







export async function getLocks(req: Request, res: Response) {
    getList(getRepository(Lock), req, res)
}

export async function getLock(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await getRepository(Lock).findOne(id/* , {relations: ["keys", "reader", "building", "apartment", "apartmentLock", "buildingLock", ]} */)

        if (!result) {
            return res.status(404).send({ message: `could not find lock with the provided id ${id}` })
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "server error" })
    }
}


export async function createLock(req: Request, res: Response) {
    try {

        const repo = getRepository(Lock);
        const lock = repo.create(req.body as Lock);

        if (lock.type === "Wohnungsschloss" && lock.apartmentId) {
            lock.apartmentLock = await getRepository(Apartment).findOne(lock.apartmentId)
            lock.apartmentId = null;
        } else if (lock.type === "Gebäudeschloss" && lock.buildingId) {
            lock.buildingLock = await getRepository(Building).findOne(lock.buildingId)
        }
        const result = await repo.save(lock);
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}


export async function editLock(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const { building, apartment, reader, apartmentLock, buildingLock, ...updateObject } = req.body

        if (updateObject.type === "Wohnungsschloss" && updateObject.apartmentId) {
            updateObject.apartmentLock = await getRepository(Apartment).findOne(updateObject.apartmentId)
            updateObject.apartmentId = null;
        } else if (updateObject.type === "Gebäudeschloss" && updateObject.buildingId) {
            updateObject.buildingLock = await getRepository(Building).findOne(updateObject.buildingId)
        }
        const result = await getRepository(Lock).save(updateObject);
        console.log(result)
        res.send(result)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to update lock"
        })
    }
}


export async function deleteLock(req: Request, res: Response) {
    try {
        const result = await getRepository(Lock).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}






