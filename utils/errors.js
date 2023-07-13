/* eslint no-underscore-dangle: 0 */


// Класс универсальной ошибки. Наследует от класса Error,
// устанавливает statusCode ситуационно, составляет как можно точнее message
class UniError extends Error {
  constructor(err, place) {
    super(err.message);

    this._ERRORS = {
      ValidationError: {code: 400, message: 'Неверные данные'},
      DocumentNotFoundError: {code: 404, message: 'Не найдено'},
      CastError: {code: 400, message: 'Неверные данные'},
      MongoServerError: {code: 409, message: 'Запись уже существует'},
      WrongTokenError: {code: 401, message: 'Неверный токен'},
      UnAuthorizedError: {code: 401, message: 'Нет авторизации'},
      default: {code: 500, message: 'Ошибка'},
    };

    // заполнить
    this._fillError(err, place);
  }

  _fillError(err, place) {
    let errorCode = this._ERRORS.default.code;
    let errorMessage = `${err.message ? err.message : this._ERRORS.default.message}: (${place})`;

    if (this._ERRORS[err.name]) {
      errorCode = this._ERRORS[err.name].code;
      errorMessage = `${this._ERRORS[err.name].message} (${place})`;
    }

    this.statusCode = errorCode;
    this.message = `${errorMessage} [${err.name}]`;
  }
}


module.exports = UniError;