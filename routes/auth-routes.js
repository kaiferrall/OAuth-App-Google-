const router = require("express").Router();
const passport = require("passport");

//@route Auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//@route Logout
router.get("/logout", (req, res) => {
  //Handle with passport
  res.send("logging out");
});

//@route Auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//@route callback route for google redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You have reached the callback URI...");
});

module.exports = router;
