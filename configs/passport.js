const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./../models').User;
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
        User.findAll({ where: { id: jwtPayload.id } }).then(user => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        }).catch(err => console.error(err));
    }))
}