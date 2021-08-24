const UserService = require('../services/user');

module.exports = {
  Query: {
    users: () => {},
    loginUser: (_, body) => UserService.userLogin(body)
  },
  Mutation: {
    createUser: (_, body) => UserService.userSignUp(body)
  }
};