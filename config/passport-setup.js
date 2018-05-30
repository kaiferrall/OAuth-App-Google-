const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //Options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user already exists in database
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //user already exists
          console.log("user is: " + currentUser);
          done(null, currentUser);
        } else {
          //Create new user in database
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("New User: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
