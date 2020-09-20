import { User } from "../entity/User";
import { getRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";


export function getUser(username: string, password: string): Promise<User> {
  return new Promise<User>(async (resolve, reject) => {
    try {
      const userRepo: Repository<User> = getRepository(User);
      const user: User = await userRepo.findOneOrFail({ username: username });
      console.log(password, user.password)
      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("password not matching");
      }
      // no need to share the password
      delete user.password;
      resolve(user)
    }
    catch (e) {
      console.log(e);
      reject(e);
    }
  })
}
