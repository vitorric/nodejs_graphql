const { resJsonP } = require('../../../utils'),
  { loginUser } = require('../../../services/user');

module.exports = () => (req, res) => {
  loginUser(req.user)
    .then(result => resJsonP(res, 200, true, result))
    .catch(err => resJsonP(res, 200, false, err));
};