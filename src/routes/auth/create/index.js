const { resJsonP } = require('../../../utils'),
  { userSignUp } = require('../../../services/user');

module.exports = () => (req, res) => {
  userSignUp({ ...req.body })
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};