const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./../models/user.model");
const config = require("./../config/database");

module.exports = function (passport) {
    const options = {};

    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
    options.secretOrKey = config.secret;

    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.getById(jwt_payload.data._id)
                .then((user) => {
                    if (user) return done(null, user);

                    return done(null, false);
                })
                .catch((error) => done(error, false));
        })
    );
};
