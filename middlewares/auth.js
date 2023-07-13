module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const UniError = require('../utils/errors');
  const { secredKey } = require('../utils/constants');

  const bearerSign = 'Bearer ';

  const {authorization} = req.headers;


  if (!authorization || !authorization.startsWith(bearerSign)) {
    throw(new UniError({name: 'UnAuthorizedError'}, 'нет авторизационных данных в заголовке'));
  }

  const token = authorization.replace(bearerSign, '');

  let payload;  // init

  try {
    payload = jwt.verify(token, secredKey);
  } catch (err) {
    throw(new UniError({name: 'WrongTokenError'}, 'неверный токен'));
  }

  req.user = payload;

  next();
};