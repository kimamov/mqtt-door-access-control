import { User } from "../entity/User";
import { getRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

// move this code to local passport strategy might use it again later

export function getUser(username: string, password: string): Promise<User> {
  return new Promise<User>(async (resolve, reject) => {
    try {
      const userRepo: Repository<User> = getRepository(User);
      const user: User = await userRepo.findOneOrFail({ username: username });
      //console.log(password, user.password)
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
      //reject(e); giving the user the real error might not be a good idea :)
      reject("could not find user")
    }
  })
}
