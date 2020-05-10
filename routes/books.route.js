const express = require("express");

const db = require("../db");
const generateId = require("../generateId");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

router.get("/search", (req, res) => {
  var q = req.query.q;
  var filteredBooks = db
    .get("books")
    .value()
    .filter(book => {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

  res.render("books/index", {
    books: filteredBooks,
    q: q
  });
});

router.get("/add", (req, res) => {
  res.render("books/add");
});

router.get("/:id/delete", (req, res) => {
  db.get("books")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.redirect("back");
});

router.get("/:id/update", (req, res) => {
  var book = db
    .get("books")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.render("books/update", {
    book: book
  });
});

router.post("/add", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var newBook = {
    id: generateId("books"),
    title: title,
    description: description
  };
  db.get("books")
    .push(newBook)
    .write();
  res.redirect("/books");
});

router.post("/:id/update", (req, res) => {
  var updateBook = {
    title: req.body.title,
    description: req.body.description
  };
  db.get("books")
    .find({ id: parseInt(req.params.id) })
    .assign(updateBook)
    .write();
  res.redirect("/books");
});

module.exports = router;
