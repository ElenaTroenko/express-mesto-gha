module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const UniError = require('../utils/errors');
  const { secredKey } = require('../utils/constants');

  const bearerSign = 'Bearer ';
  const {authorization} = req.headers;

  // Проверка существования авторизационных данных и соответствия их Bearer
  if (!authorization || !authorization.startsWith(bearerSign)) {
    throw(new UniError({name: 'UnAuthorizedError'}, 'нет авторизационных данных в заголовке'));
  }

  const token = authorization.replace(bearerSign, '');

  let payload;  // init

  try {
    payload = jwt.verify(token, secredKey);
  } catch (err) {
    throw(new UniError({name: 'WrongTokenError'}, 'auth middleware'));
  }

  req.user = payload;

  next();
};