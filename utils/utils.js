
// Уточнение ошибки. Меняет имя ошибки на новое,
// если оно совпадает с требуемым для замены
const fixErr = (err, oldName, newName) => {
  if (err.name == oldName) {
    err.name = newName;
  }

  return err;
};


module.exports = fixErr;