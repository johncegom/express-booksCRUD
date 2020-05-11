const db = require("../db");
const generateId = require("../generateId");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.getAdd = (req, res) => {
  res.render("users/add", {
    users: db.get("users").value()
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var filteredUsers = db
    .get("users")
    .value()
    .filter(user => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: filteredUsers
  });
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: parseInt(id) })
    .write();
  res.redirect("back");
};

module.exports.getUpdate = (req, res) => {
  var user = db
    .get("users")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.render("users/update", {
    user: user
  });
};

module.exports.postAdd = (req, res) => {
  var name = req.body.name;
  var newUser = {
    id: generateId("users"),
    name: name
  };
  db.get("users")
    .push(newUser)
    .write();
  res.redirect("/users");
};

module.exports.postUpdate = (req, res) => {
  var updateUser = {
    name: req.body.name
  };
  db.get("users")
    .find({ id: parseInt(req.params.id) })
    .assign(updateUser)
    .write();
  res.redirect("/users");
};

