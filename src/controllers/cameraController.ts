import { Request, Response } from "express";
import { Repository, getRepository } from "typeorm";
import { Camera } from "../entity/Camera";
import getList from "../util/getList";
import BaseController from "./basecontroller";

export class CameraController<T> extends BaseController<T>{
    constructor(service: Repository<T>) {
        super(service)
    }
}









export async function getCameras(req: Request, res: Response) {
    getList(getRepository(Camera), req, res)
}

export async function getCamera(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await getRepository(Camera).findOne(id)

        if (!result) {
            return res.status(404).send({ message: `could not find building with the provided id ${id}` })
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "server error" })
    }
}


export async function createCamera(req: Request, res: Response) {
    try {
        const result = await getRepository(Camera).save(req.body);
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}


export async function deleteCamera(req: Request, res: Response) {
    try {
        const result = await getRepository(Camera).delete(req.params.id)
        return res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}





