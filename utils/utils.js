const ERRORS = {
  ValidationError: {
    code: 400,
    message: 'переданы некорректные данные',
  },

  HZ: {
    code: 404,
    message: 'не найдено',
  }
};

const sendError = (res, err, errMessage) => {
  let statusCode = 500;

  if (ERRORS[err.name]) {
    statusCode = ERRORS[err.name].code;
    errMessage = `${errMessage}: ${ERRORS[err.name].message}.`;
  } else {
    errMessage = `${errMessage}: ${err.name}: ${err.message}`;
  }

  res.status(statusCode);
  res.send({massage: errMessage});
};

module.exports = { sendError };