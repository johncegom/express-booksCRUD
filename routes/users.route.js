const express = require("express");

const db = require("../db");
const generateId = require("../generateId");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/add", (req, res) => {
  res.render("users/add", {
    users: db.get("users").value()
  });
});

router.get("/search", (req, res) => {
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
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: parseInt(id) })
    .write();
  res.redirect("back");
});

router.get("/:id/update", (req, res) => {
  var user = db
    .get("users")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.render("users/update", {
    user: user
  });
});

router.post("/add", (req, res) => {
  var name = req.body.name;
  var newUser = {
    id: generateId("users"),
    name: name
  };
  db.get("users")
    .push(newUser)
    .write();
  res.redirect("/users");
});

router.post("/:id/update", (req, res) => {
  var updateUser = {
    name: req.body.name
  };
  db.get("users")
    .find({ id: parseInt(req.params.id) })
    .assign(updateUser)
    .write();
  res.redirect("/users");
});

module.exports = router;
