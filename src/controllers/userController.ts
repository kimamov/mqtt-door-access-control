import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import getList from "../util/getList";

const validUserTypes=["admin", "user"]

export const isAdmin=(user: User)=>user.type && user.type==="admin"
export const isUser=(user: User)=>user.type && user.type==="user"
export const isInvalidUser=(user: User)=>!user.type || !validUserTypes.includes(user.type)

export function logIn(username: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      try {
        const user=await getRepository(User).findOneOrFail({ username: username });
        console.log(user)
        if (!(await bcrypt.compare(password, user.password))) {
          throw new Error("password not matching");
        }
        // check if user is varified 
        if (isInvalidUser(user)) {
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
  

export async function signUp(req: Request, res: Response) {
  try {
      console.log(req.body)
      const {username, password}=req.body;
      if(!username  || !password){
        res.status(500).send("username and password needs to be provided");
      }
      const repo = getRepository(User);
      // check if user with that name already exists
      const foundUser = await repo.findOne({username});
      // if so you are done here
      if (foundUser) return res.status(500).send("user already exists");
      // create new user
      const user = new User();
      user.username = username;
      user.password = password;
      // save user into the database
      const createdUser=await repo.save(user);
      return res.status(201).send(createdUser);
  } catch (e) {
      //console.log(e);
      res.status(500).send("could not create user. Most likely the user already exists.");
  }
    
}

export async function editUser(req: Request, res: Response){
  try {
      const userRepo=getRepository(User);
      const user=await userRepo.findOneOrFail(req.params.id);
      
      const {username, password, type}=req.body;
      
      if(username) user.username=username;
      if(password) user.password=await bcrypt.hash(password, 10);;
      if(type) user.type=type;

     
      await userRepo.save(user);
      
      res.send(user)
  } catch (error) {
      console.log(error)
      res.status(500).send(error);
  }
}

export function getUsers(req: Request, res: Response){
  getList(getRepository(User), req, res, {select: ["id","username", "type"]})
}

export async function getUserById(req: Request, res: Response){
  try {
    const id=req.params.id
    const foundUser=await getRepository(User).findOneOrFail(id, {select: ["id","username","type"]});
    if (foundUser) delete foundUser.password;
    res.send(foundUser);
  } catch (error) {
    res.status(404).send({error: "could not find user with the provided id"});
  }
}

