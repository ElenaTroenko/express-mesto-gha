const jwt = require('jsonwebtoken');
const UniError = require('../utils/errors');
const { secredKey } = require('../utils/constants');

const bearerSign = 'Bearer ';

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization || !authorization.startsWith(bearerSign)) {
    throw(new UniError({message: 'неверный токен', name: 'UnAuthorizedError'}, 'защита авторизацией'));
  }

  const token = authorization.replace(bearerSign, '');

  let payload;  // init

  try {
    payload = jwt.verify(token, secredKey);
  } catch (err) {
    next(new UniError({message: 'неверный токен', name: 'WrongTokenError'}, 'защита авторизацией'));
  }

  req.user = payload;
  next();
};