const passport = require("passport");
const LocalStrategy = require("passport-local");
import { getUser } from './auth'

module.exports = new LocalStrategy(async (username: string, password: string, done: Function) => {
    try {
        const user = await getUser(username, password);
        return done(null, user);
    } catch (e) {
        console.log(e);
        return done(null, false, {
            message: "invalid credentials",
        });
    }
});