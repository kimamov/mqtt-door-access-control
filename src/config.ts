import * as session from 'express-session';


export const sessionParser = session({
    secret: "nyana",
    resave: true,
    saveUninitialized: true,
})