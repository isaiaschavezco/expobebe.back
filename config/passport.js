/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:49:34-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   Guillermo
 * @Last modified time: 2020-08-25T18:57:40-05:00
 * @License: MIT
 */

 const JwtStrategy = require("passport-jwt").Strategy;
 const ExtractJwt = require("passport-jwt").ExtractJwt;
 const mongoose = require("mongoose");
 // const User = mongoose.model("users");
 const User = require("../models/Users");

 const keys = require("../config/keys");

 const opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 opts.secretOrKey = keys.secretOrKey;

 module.exports = passport => {
   //console.log("Using...")
   passport.use(
     new JwtStrategy(opts, (jwt_payload, done) => {
       //console.log("jwt_payload:" + JSON.stringify(jwt_payload))
       User.findById(jwt_payload.id)
       // User.findOne({id: jwt_payload.sub})
         .then(user => {
           //console.log("user:"+user)
           if (user) {
             // req.user = user;
             return done(null, user);
           }
           return done(null, false);
         })
         .catch(err => console.log(err));
     })
   );
 };
