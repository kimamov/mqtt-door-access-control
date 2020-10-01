const passport = require("passport");
const LocalStrategy = require("passport-local");
import { User } from "../entity/User";
import { getRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

module.exports = new LocalStrategy(async (username: string, password: string, done: Function) => {
    try {
        const userRepo: Repository<User> = getRepository(User);
        const user: User = await userRepo.findOneOrFail({ username: username });
        if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, {
                message: "could not find a user with the provided credentials"
            })
        }
        // check if user is varified 
        if (user.type < 1) {
            return done(null, false, {
                message: "user was not varified yet. Please contact an admin."
            })
        }
        // no need to share the password
        delete user.password;
        return done(null, user);
    }
    catch (e) {
        console.log(e);
        return done("could not find a user with the provided credentials")
    }
});