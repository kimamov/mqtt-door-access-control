const router = require("express").Router();
const passport = require("passport");
import { getAllAccesses } from '../controllers/accessController';
import { getAllEvents } from '../controllers/eventController';
import { addKey, getAllKeys, syncKey } from '../controllers/keyController';
import { getReaderKeys, getAllReaders, getMyReaderKeys, addReaderKeys } from '../controllers/readerController';
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

router.get("/key"/* , checkAuth */, getAllKeys)

router.post("/synckey"/* , checkAuth */, syncKey)

router.get("/readers"/* , checkAuth */, getAllReaders)

router.get("/raederkeystest/:doorid"/* , checkAuth */, getReaderKeys)

router.get("/readerkeys"/* , checkAuth */, getMyReaderKeys)

router.post("/readerkeys"/* , checkAuth */, addReaderKeys)

router.get("/access"/* , checkAuth */, getAllAccesses)

router.get("/events"/* , checkAuth */, getAllEvents)

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
