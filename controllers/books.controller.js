const db = require("../db");
const generateId = require("../generateId");

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.search = (req, res) => {
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
};

module.exports.getAdd = (req, res) => {
  res.render("books/add");
};

module.exports.delete = (req, res) => {
  db.get("books")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.redirect("back");
};

module.exports.getUpdate = (req, res) => {
  var book = db
    .get("books")
    .find({ id: parseInt(req.params.id) })
    .value();
  res.render("books/update", {
    book: book
  });
};

module.exports.postAdd = (req, res) => {
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
};

module.exports.postUpdate = (req, res) => {
  var updateBook = {
    title: req.body.title,
    description: req.body.description
  };
  db.get("books")
    .find({ id: parseInt(req.params.id) })
    .assign(updateBook)
    .write();
  res.redirect("/books");
};
