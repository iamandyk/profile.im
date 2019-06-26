const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const helmet = require("helmet");
const app = express();
const mongo = require("mongo");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.API_URL}/login`
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

// add some security-related headers to the response
app.use(helmet());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(passport.initialize());

app.get(
  "*",
  passport.authenticate("facebook", {
    session: false
  }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = app;
