// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");

const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");

db.defaults({ books: [] }).write();

app.get("/", (req, res) => {
  res.send("This is main page!");
});

app.get("/books", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

app.get("/books/search", (req, res) => {
  var q = req.query.q;
  var filteredBooks = db.get('books').value().filter(book => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render("books/index", {
    books: filteredBooks,
    q: q
  });
});

app.get("/books/add", (req, res) => {
  res.render("books/add");
});

app.get("/books/:id/delete", (req, res) => {
  db.get("books")
    .remove({ id: parseInt(req.params.id) })
    .write();
  res.redirect('back');
});

app.get("/books/:id/update", (req, res) => {
  var book = db.get('books').find({ id: parseInt(req.params.id) }).value();
  res.render("books/update", {
    book: book
  });
});

app.post("/books/add", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var newBook = {
    id: generateId(),
    title: title,
    description: description
  };
  db.get("books")
    .push(newBook)
    .write();
  res.redirect('/books');
});

app.post("/books/:id/update", (req, res) => {
  var updateBook = {
    title: req.body.title,
    description: req.body.description
  };
  db.get('books')
  .find({ id: parseInt(req.params.id) })
  .assign(updateBook)
  .write()
  res.redirect('/books');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function generateId() {
  let todos = db.get("books").value();
  let temp, temp1;
  for (let i = 0; i < todos.length; i++) {
    temp1 = db
      .get("books")
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
