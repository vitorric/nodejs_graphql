const { getUserByEmailRepository, createUserRepository, getUserByIdRepository } = require('../../repositories/user'),
  AuthMiddleware = require('../../middleware/auth'),
  { getMD5 } = require('../../utils');

exports.userSignUp = async ({ name, email, password }) => {

  if (!name || !email || !password) {
    throw { msg: 'Informações faltantes' };
  }

  let user = await getUserByEmailRepository(email);

  if (user) {
    throw { msg: 'Usuário já cadastrado' };
  }

  const encryptedPassword = getMD5(password);
  user = await createUserRepository({ name, email, password: encryptedPassword, role: 'user' });

  if (user) {
    const token = AuthMiddleware.create({ _id: user._id });

    return {
      ...user._doc,
      token
    };
  }
};

exports.userLogin = async ({email, password}) => {
  const user = await getUserByEmailRepository(email);

  if (!user){
    throw { msg: 'Unauthorized' };
  }

  if (!getMD5(password) === user.password){
    throw { msg: 'Unauthorized' };
  }

  if (user.role !== 'user' || user.delete || !user.status) {
    throw { msg: 'Unauthorized' };
  }

  const token = AuthMiddleware.create({ _id: user._id });
  return {
    ...user._doc,
    token
  };
};

exports.getUser = async ({ _id }) => await getUserByIdRepository(_id);