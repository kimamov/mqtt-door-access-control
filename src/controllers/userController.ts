import { getRepository } from "typeorm";
import { User } from "../entity/User";

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

export default createUser;