const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  const bearerSign = 'Bearer ';
  const UniError = require('../utils/utils');
  const { secredKey } = require('../utils/constants');

  if (!authorization || !authorization.startsWith(bearerSign)) {
    throw(new UniError({message: 'нет авторизации', statusCode: 401}));
  }

  const token = authorization.replace(bearerSign, '');

  let payload;  // init

  try {
    payload = jwt.verify(token, secredKey);
  } catch (err) {
    throw(new UniError({message: 'неверный токен', statusCode: 401}));  }

  req.user = payload;
  next();
};