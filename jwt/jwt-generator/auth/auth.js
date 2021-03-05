import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
const { Strategy: localStrategy } = passportLocal;
const { ExtractJwt: ExtractJWT, Strategy: JWTstrategy } = passportJwt;

import UserModel from "../model/user.model.js";

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    console.log(username);
    try {
      const user = await UserModel.create({ username, password });

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "login",
  new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);
