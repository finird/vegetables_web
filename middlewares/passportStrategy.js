const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const User = require('../models/User');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;


const Strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    console.log('Payload received', jwt_payload);
    const user = User.findOne({id: jwt_payload.id});
    if(user) {
        req.user = user;
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports.strategy = Strategy;
