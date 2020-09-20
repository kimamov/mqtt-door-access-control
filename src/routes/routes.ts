const router = require("express").Router();
const passport = require("passport");
import { checkAuth } from '../middlewares/middlewares';

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/asd",
  }),
  async (req, res) => {
    req.session.myUser = "hello world";

    res.send({
      message: "you logged in successfully",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  const user = req.user;
  req.logout();
  req.session.destroy();

  res.send("successfully logged out");
});

router.get("/testuser", (req, res) => {
  console.dir(req.session)
  req.session.testData = "hello world"
  res.send("got user");
});

/* router.post("/signup", async (req, res) => {
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
}); */



router.get("/user", checkAuth, (req, res) => {
  res.send(req.user)
})


module.exports = router;
