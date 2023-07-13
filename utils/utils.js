// Уточнение ошибки. Меняет имя ошибки на новое,
// если оно совпадает с требуемым для замены
const fixErr = (err, oldName, newName) => {
  if (err.name == oldName) {
    err.name = newName;
  }

  return err;
};


// шлет ошибку в ответ (res)
const sendError = (err, res) => {
  const { statusCode = 500, message = 'Что-то пошло не так...' } = err;

  res.status(statusCode).send({message});
};


module.exports = { fixErr, sendError };