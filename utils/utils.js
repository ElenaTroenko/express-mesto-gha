// шлет ошибку в ответ (res)
const sendError = (err, res) => {
  const { statusCode = 500, message = 'Что-то пошло не так...' } = err;

  res.status(statusCode).send({message});
};


module.exports = sendError;