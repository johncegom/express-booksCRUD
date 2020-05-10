const db = require('./db');

function generateId(typeName) {
  let todos = db.get(typeName).value();
  let temp, temp1;
  for (let i = 0; i < todos.length; i++) {
    temp1 = db
      .get(typeName)
      .find({ id: i + 1 })
      .value();
    console.log(typeof temp1);
    if (!temp1) {
      console.log(i);
      return i + 1;
    }
  }
  return todos.length + 1;
}

module.exports = generateId;