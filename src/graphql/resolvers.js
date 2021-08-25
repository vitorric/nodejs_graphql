const UserService = require('../services/user'),
  AuthMiddleware = require('../middleware/auth');

module.exports = {
  Query: {
    users: () => {},
    loginUser: (_, body) => UserService.userLogin(body),
    getUser: async (_, body, context) => {
      await AuthMiddleware.authenticate(context);
      return UserService.getUser(body);
    }
  },
  Mutation: {
    createUser: (_, body) => UserService.userSignUp(body)
  }
};