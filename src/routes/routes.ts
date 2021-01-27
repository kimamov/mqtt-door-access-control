import { deleteAccess, editAccess, getAccess, getAccesses } from '../controllers/accessController';
import { deleteEvent, editEvent, getEvent, getEvents } from '../controllers/eventController';
import { addKey, editKey, getKey, getKeys, deleteKey } from '../controllers/keyController';
import { deleteNewKey, editNewKey, getNewKey, getNewKeys } from '../controllers/newKeyController';
import { syncAllKeys, deleteAllKeys, openDoor, generateReaderKeys, generateAllReaderKeys} from '../controllers/deviceController';
import { getReaders, addReaderKeys, getReaderWithKeys, editReaderKeys } from '../controllers/readerController';
import  {signUp, editUser, getUsers, getUserById } from '../controllers/userController';
import { checkAuth } from '../middlewares/middlewares';
import { client } from '../mqtt/connection';
import { createLock, getLock, getLocks } from '../controllers/lockController';
import { getBuildings, getBuilding, createBuilding } from '../controllers/buildingController';
import { createApartment, getApartment, getApartments } from '../controllers/apartmentController';
/* import { client } from '../mqtt/connection';
 */

const router = require("express").Router();
const passport = require("passport");


router.post(
  "/login",
  passport.authenticate("local"/* , {
    failureFlash: true
  } */),
  async (req, res) => {
    req.session.myUser = "hello world";
    https://github.com/espressif/arduino-esp32/tree/master/libraries/WiFiClientSecure
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

router.post("/signup", signUp);


router.get("/user", getUsers)

router.get("/user/:id", getUserById)

router.put("/user/:id", editUser)

router.post("/user", signUp);


router.get("/building"/* , checkAuth */, getBuildings)

router.get("/building/:id", getBuilding)

router.post("/building"/* , checkAuth */, createBuilding)


router.get("/apartment"/* , checkAuth */, getApartments)

router.get("/apartment/:id", getApartment)

router.post("/apartment"/* , checkAuth */, createApartment)


/* router.get("/openlock/:id", (req, res)=>{
  console.log(req.params);
  res.send({
    message: `successfully opened lock`
  })
}) */

router.post("/lock"/* , checkAuth */, createLock)

router.get("/lock"/* , checkAuth */, getLocks)

router.get("/lock/:id", getLock)

/* router.put("/key/:id", editKey)

router.delete("/key/:id", deleteKey) */


// TODO: split the routes into different files
router.post("/key"/* , checkAuth */, addKey)

router.get("/key"/* , checkAuth */, getKeys)

router.get("/key/:id", getKey)

router.put("/key/:id", editKey)

router.delete("/key/:id", deleteKey)






router.get("/newkey", getNewKeys)

router.get("/newkey/:id", getNewKey)

router.put("/newkey/:id", editNewKey)

router.delete("/newkey/:id", deleteNewKey)




router.get("/access"/* , checkAuth */, getAccesses)

router.get("/access/:id", getAccess)

router.put("/access/:id", editAccess)

router.delete("/access/:id", deleteAccess)




router.get("/event"/* , checkAuth */, getEvents)

router.get("/event/:id", getEvent)

router.put("/event/:id", editEvent)

router.delete("/event/:id", deleteEvent)





router.get("/opendoor/:id", openDoor)

router.get("/reader"/* , checkAuth */, getReaders)

router.get("/reader/:id", getReaderWithKeys)

router.post("/reader", addReaderKeys)

router.put("/reader/:id", editReaderKeys)

router.get("/deleteall/:id", deleteAllKeys)

router.get("/syncall/:id", syncAllKeys)

router.get("/devicekey"/* , checkAuth */, generateAllReaderKeys)

router.get("/devicekey/:id"/* , checkAuth */, generateReaderKeys)

router.get("/readerkey"/* , checkAuth */, generateAllReaderKeys)

router.get("/readerkey/:id"/* , checkAuth */, generateReaderKeys)

router.post("/readerkey"/* , checkAuth */, addReaderKeys)



router.get("/testmqtt", (req, res) => {
  client.publish("devnfc", JSON.stringify({
    message: "test message"
  }))
  res.send("succes")
})

router.get("/user", checkAuth, (req, res) => {
  res.send(req.user)
})


module.exports = router;
