const db = require("../db");
const generateId = require("../generateId");

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
      bookTitle: bookTitle.title,
      isComplete: transaction.isComplete
    };
    customTransactions.push(temp);
  }

  return customTransactions;
}

module.exports.index = (req, res) => {
  res.render("transactions/index", {
    transactions: customTransactions()
  });
};

module.exports.getAdd = (req, res) => {
  var users = db.get("users").value();
  var books = db.get("books").value();

  res.render("transactions/add", {
    users: users,
    books: books
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var filteredTransactions = customTransactions().filter(transaction => {
    console.log(typeof transaction.username);
    return transaction.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("transactions/index", {
    transactions: filteredTransactions,
    q: q
  });
};

module.exports.delete = (req, res) => {
  var id = parseInt(req.params.id);

  db.get("transactions")
    .remove({ id: id })
    .write();
  res.redirect("back");
};

module.exports.postAdd = (req, res) => {
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
};

module.exports.complete = (req, res) => {
  var id = parseInt(req.params.id);
  let dbId = db.get('transactions').find({ id: id }).value();
  var error = "This transaction Id doesn't exist!";
  
  if (!dbId) {
    res.render("transactions/index", {
      transactions: customTransactions(),
      error: error
    });
    return;
  }
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: true })
    .write();
};
