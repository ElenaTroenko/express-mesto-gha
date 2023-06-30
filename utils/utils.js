// Отправляет ответ сервера с нужным кодом ошибки.
// Код и сообщение определяются ситуационно
const sendError = (res, err, msg) => {

  const ERRORS = {
    ValidationError: {code: 400, message: 'Неверные данные'},
    DocumentNotFoundError: {code: 404, message: 'Не найдено'},
    CastError: {code: 400, message: 'Не найдено'},
    default: {code: 500, message: 'Ошибка'},
  };

  let error_code = ERRORS.default.code;
  let error_message = `${ERRORS.default.message} (${msg})`;

  if (ERRORS[err.name]) {
    error_code = ERRORS[err.name].code;
    error_message = `${ERRORS[err.name].message} (${msg})`;
  }

  res.status(error_code).send({message: `${error_message} [${err.name}]`});
};


// Уточнение ошибки. Меняет имя ошибки на новое,
// если оно совпадает с требуемым для замены
const fixErr = (err, oldName, newName) => {
  if (err.name == oldName) {
    err.name = newName;
  }

  return err;
};


module.exports = sendError, fixErr;