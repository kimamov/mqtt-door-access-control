const router = require("express").Router();
const passport = require("passport");
import { getAccesses } from '../controllers/accessController';
import { getEvents } from '../controllers/eventController';
import { addKey, getKeys, syncKey } from '../controllers/keyController';
import { getNewKeys } from '../controllers/newKeyController';
import { getReaderKeys, getReaders, getMyReaderKeys, addReaderKeys } from '../controllers/readerController';
import createUser from '../controllers/userController';
import { checkAuth } from '../middlewares/middlewares';
import { client } from '../mqtt/connection';
/* import { client } from '../mqtt/connection';
 */
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



router.post("/key"/* , checkAuth */, addKey)

router.get("/key"/* , checkAuth */, getKeys)

router.get("/newkey", getNewKeys)

router.post("/synckey"/* , checkAuth */, syncKey)

router.get("/reader"/* , checkAuth */, getReaders)

router.get("/raederkeytest/:doorName"/* , checkAuth */, getReaderKeys)

router.get("/readerkey"/* , checkAuth */, getMyReaderKeys)

router.post("/readerkey"/* , checkAuth */, addReaderKeys)

router.get("/access"/* , checkAuth */, getAccesses)

router.get("/event"/* , checkAuth */, getEvents)

router.get("/testmqtt", (req, res) => {
  console.log(client.connected)
  client.publish("devnfc", JSON.stringify({
    message: "test message"
  }))
  res.send("succes")
})

router.get("/user", checkAuth, (req, res) => {
  res.send(req.user)
})


module.exports = router;
