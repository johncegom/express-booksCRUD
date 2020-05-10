const express = require("express");

const db = require("../db");
const generateId = require("../generateId");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("transactions/index", {
    transactions: customTransactions()
  });
});

router.get("/add", (req, res) => {
  var users = db.get("users").value();
  var books = db.get("books").value();

  res.render("transactions/add", {
    users: users,
    books: books
  });
});

router.get("/search", (req, res) => {
  var q = req.query.q;
  var filteredTransactions = customTransactions().filter(transaction => {
    console.log(typeof transaction.username);
    return transaction.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("transactions/index", {
    transactions: filteredTransactions,
    q: q
  });
});

router.get("/:id/delete", (req, res) => {
  var id = parseInt(req.params.id);
  
  db.get('transactions').remove({ id: id }).write();
  res.redirect('back');
});

router.post("/add", (req, res) => {
  var userId = parseInt(req.body.user);
  var bookId = parseInt(req.body.book);
  var newTransaction = {
    id: generateId("transactions"),
    userId: userId,
    bookId: bookId
  };

  db.get("transactions")
    .push(newTransaction)
    .write();
  res.redirect("/transactions");
});

function customTransactions() {
  var transactions = db.get("transactions").value();
  var temp;
  var customTransactions = [];

  for (let transaction of transactions) {
    var username = db
      .get("users")
      .find({ id: transaction.userId })
      .value();
    var bookTitle = db
      .get("books")
      .find({ id: transaction.bookId })
      .value();

    temp = {
      id: transaction.id,
      username: username.name,
      bookTitle: bookTitle.title
    };
    customTransactions.push(temp);
  }

  return customTransactions;
}

module.exports = router;
