const db = require("../db");

module.exports.count = (req, res, next) => {
  var count = db.get("cookies").find({ name: "count" }).value().value;
  if(req.cookies.cookie) {
    count += 1;
    db.get("cookies").find({ name: "count" }).assign({ value: count }).write();
  }
  console.log("<cookie>: <" + count + ">");
  next();
};