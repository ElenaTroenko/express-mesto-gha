const sendError = (res, err, msg) => {


  const ERRORS = {
    ValidationError: {code: 400, message: 'Неверные данные'},
    DocumentNotFoundError: {code: 404, message: 'Не найдено'},
    CastError: {code: 404, message: 'Не найдено'},
    default: {code: 500, message: 'Ошибка'},
  };

  let error_code = ERRORS.default.code;
  let error_message = `${ERRORS.default.message} (${msg})`;

  if (ERRORS[err.name]) {
    error_code = ERRORS[err.name].code;
    error_message = `${ERRORS[err.name].message} (${msg})`;
  }

  res.status(error_code).send({message: error_message});
};


module.exports = sendError;