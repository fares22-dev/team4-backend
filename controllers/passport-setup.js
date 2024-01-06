const passport = require('passport');
const Doctor = require('../models/doctorModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      // You can customize how user data is saved in your database here
      const user = {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
