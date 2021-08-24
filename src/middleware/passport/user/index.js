module.exports = () => {
  const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    { getUserByIdRepository, getUserByEmailRepository } = require('../../../repositories/user'),
    { getMD5 } = require('../../../utils');

  passport.use('userAuth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async(payload,done) => {

    try{
      if (!payload.auth)
        return done(null, false);

      const user = await getUserByIdRepository(payload.auth._id);

      if(!user){
        return done(null, false);
      }

      if (user.role !== 'user' || user.delete || !user.status) {
        return done(null, false);
      }

      // Otherwise, return the user
      done(null, user);
    }catch(error){
      done(error,false);
    }
  }));

  passport.use('user', new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {

    try{
      // get the user given the email
      const user = await getUserByEmailRepository(email);

      // If not, handle it
      if (!user){
        return done(null, null);
      }

      // Check if the password is corret
      const isMatch = getMD5(password) === user.password;

      // If not, handle it
      if (!isMatch){
        return done(null, null);
      }

      // Otherwise, return the cliente
      done(null, user);

    }catch(error){
      done(error, false);
    }
  }));

  return passport;
};