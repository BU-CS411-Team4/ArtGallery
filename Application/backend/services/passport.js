const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserSchema = require('../models/user');


require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await UserSchema.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new UserSchema({ googleId: profile.id, displayName: profile.displayName }).save();
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await UserSchema.findById(id);
    done(null, user);
  } catch (err) {
    console.log('Error occurred: ' + err);
    done(err, null);
  }
});
