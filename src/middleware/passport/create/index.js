const JWT = require('jsonwebtoken');

exports.createToken = (user) => {
  try
  {
    return JWT.sign({
      auth: user,
      exp: new Date(new Date().getFullYear(), 11, 31).getTime()
    },
    process.env.JWT_SECRET);
  }
  catch (error)
  {
    console.log(error);
    throw error;
  }
};