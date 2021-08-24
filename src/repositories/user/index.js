const { User } = require('../../schemas/user'),
  { ObjectIdCast } = require('../../utils');

exports.createUserRepository = async user => {
  try {
    return User.create(user);
  } catch (error) {
    console.log('Error in createUserRepository: ', error);
  }
};

exports.getUserByEmailRepository = email => {
  try {
    return User.findOne({ email }).exec();
  } catch (error) {
    console.log('Error in getUserByEmailRepository', error);
  }
};

exports.getUserByIdRepository = _id => {
  try {
    return User.findOne({ _id: ObjectIdCast(_id) }).exec();
  } catch (error) {
    console.log('Error in getUserByIdRepository', error);
  }
};