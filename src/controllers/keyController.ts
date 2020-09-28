import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Key } from "../entity/Key"

export async function addKey(req: Request, res: Response) {
    try {
        const keyRepository: Repository<Key> = getRepository(Key);
        const key = await keyRepository.create(req.body);
        const result = await keyRepository.save(key)
        console.log(result)
        res.send(result)
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }

}

/* export async function addKey(req: Request, res: Response) {
    try {
        const keyData = req.body;
        const storeKey = async (keyData) => {
            const keyRepository: Repository<Key> = getRepository(Key);
            const key = await keyRepository.create(keyData);
            const result = await keyRepository.save(key)
            console.log(result)
            res.send(result)
        }
        if (Array.isArray(keyData)) {
            throw "arrays are not supported yet"
        } else {
            await storeKey(keyData)
        }
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }
} */

export async function getAllKeys(_req: Request, res: Response) {
    const keyRepository: Repository<Key> = getRepository(Key);
    const keys = await keyRepository.find()
    res.send(keys)
}

export async function getKeysByDoor(req: Request, res: Response) {

}