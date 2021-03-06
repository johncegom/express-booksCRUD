// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const db = require("./db");
const booksRoute = require("./routes/books.route");
const usersRoute = require("./routes/users.route");
const transactionsRoute = require("./routes/transactions.route");
const cookieValidate = require("./validates/cookie.validate");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", cookieValidate.count, (req, res) => {
  res.cookie('cookie', 'banhquy');
  res.render("layouts/common");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/transactions", transactionsRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
