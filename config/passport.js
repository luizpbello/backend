//const { authSecret } = require("../.env");
const passport = require("passport");
const passportJwt = require("passport-jwt");

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: process.env.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const stratregy = new Strategy(params, (payload, done) => {
    app
      .db("users")
      .where({ id: payload.id })  
      .first()
      .then((user) => done(null, user ? { ...payload } : false))
      .catch((err) => done(err, false));
  });

  passport.use(stratregy);

  return { authenticate : () => passport.authenticate('jwt', { session:false })
}
};
