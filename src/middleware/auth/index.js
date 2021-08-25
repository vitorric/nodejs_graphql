const JWT = require('jsonwebtoken'),
  { getUserByIdRepository } = require('../../repositories/user');

exports.create = (user) => {
  try
  {
    const minutes = 60 * 24 * 360;
    return JWT.sign({
      auth: user,
      exp: new Date(new Date().getTime() + minutes *60000 ).getTime()
    },
    process.env.JWT_SECRET);
  }
  catch (error)
  {
    console.log(error);
    throw error;
  }
};

exports.authenticate = async (context) => {
  const token = context.headers.authorization;
  if (token)
  {
    if (!token.includes('Bearer '))
      throw { msg: 'Unauthorized' };
    const jwtDecoded = JWT.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    if (jwtDecoded === null) {
      throw { msg: 'Unauthorized' };
    }

    if (new Date().getTime() > jwtDecoded.exp) {
      throw { msg: 'Unauthorized' };
    }

    const user = await getUserByIdRepository(jwtDecoded.auth._id);

    if (!user) {
      throw { msg: 'Unauthorized' };
    }

    if (user.role !== 'user' || user.delete || !user.status) {
      throw { msg: 'Unauthorized' };
    }

    return user;
  }

  throw { msg: 'Unauthorized' };
};