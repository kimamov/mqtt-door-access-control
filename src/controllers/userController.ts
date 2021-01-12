import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import getList from "../util/getList";

export function getUser(username: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user=await getRepository(User).findOneOrFail({ username: username });

        if (!(await bcrypt.compare(password, user.password))) {
          throw new Error("password not matching");
        }
        // check if user is varified 
        if (user.type < 1) {
          throw Error(
            "user was not varified yet. Please contact an admin."
          )
        }
        // no need to share the password
        delete user.password;
        resolve(user)
      }
      catch (e) {
        console.log(e);
        reject("could not find user")
      }
    })
  }
  

export async function createUser(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const repo = getRepository(User);
            // check if user with that name already exists
            const foundUser = await repo.findOne({ where: { username: username } });
            //console.dir(foundUser);
            // if so you are done here
            if (foundUser) throw new Error("user already exists");
            // create new user
            const user = new User();
            user.username = username;
            user.password = password;
            // save user into the database
            await repo.save(user);
            resolve(username);
        } catch (e) {
            // if anything fails dont give too much info
            console.log(e);
            reject("could not create user. Most likely the user already exists.");
        }
    });
}

export async function editUser(req: Request, res: Response){
    try {
        const user=await getRepository(User).save(req.body);
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export function getUsers(req: Request, res: Response){
    getList(getRepository(User), req, res)
}

export default createUser;