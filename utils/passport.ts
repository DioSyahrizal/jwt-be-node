import { Strategy, ExtractJwt } from "passport-jwt";
// import mongoose from "mongoose";

import User from "../models/User";

const params = {
  secretOrKey: "secret",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default (passport: any) => {
  passport.use(
    new Strategy(params, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
