const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
//View enginer set up
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 3600,
    keys: [keys.cookieKey]
  })
);

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Connect to database (Mlabs) -- (Using the DevConnect database)
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("Connected to mongodb");
});

//Set up the routes
app.use("/auth", authRoutes);

//Create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
