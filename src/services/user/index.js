const { getUserByEmailRepository, createUserRepository } = require('../../repositories/user'),
  { createToken } = require('../../middleware/passport/create'),
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
    const token = createToken({ _id: user._id });

    return {
      ...user._doc,
      token
    };
  }
};

exports.userLogin = async (user) => {
  console.log(user);
  const token = createToken({ _id: user._id });
  return {
    ...user._doc,
    token
  };
};