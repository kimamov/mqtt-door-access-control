const router = require("express").Router();
const passport = require("passport");
import { addKey, getAllKeys } from '../controllers/keyController';
import createUser from '../controllers/userController';
import { checkAuth } from '../middlewares/middlewares';
import { client } from '../mqtt/connection';

router.post(
  "/login",
  passport.authenticate("local"/* , {
    failureFlash: true
  } */),
  async (req, res) => {
    req.session.myUser = "hello world";

    res.send({
      message: "you logged in successfully",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();

  res.send("successfully logged out");
});

router.get("/testuser", (req, res) => {
  console.dir(req.session)
  req.session.testData = "hello world"
  res.send("got user");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      // if no user / password found dont bother trying to signup
      return res.status(500).send("no username or password found");
    }
    const user = await createUser(username, password);
    return res.status(201).send("succesfully created user: " + user);
  } catch (e) {
    // status conflict most likely user with that name already exists
    res.status(409).send(e);
  }
});

router.get("/mqtt", (req, res) => {
  const message = req.query.m || "default message"
  if (client.connected) {
    client.publish('devnfc', JSON.stringify({
      uuid: "15125",
      user: "kantemir",
      acctype: "999",
      validuntil: Date.now() + 6000000
    }))

  }
  res.send("published your message: " + message)
})

router.post("/key", addKey)

router.get("/keys", getAllKeys)

router.get("/user", checkAuth, (req, res) => {
  res.send(req.user)
})


module.exports = router;
