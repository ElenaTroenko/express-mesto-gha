// шлет ошибку в ответ (res)
const sendError = (err, res) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;

  res.status(statusCode).send({message});
};


module.exports = { sendError };