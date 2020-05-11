const express = require("express");

const booksController = require("../controllers/books.controller");

const router = express.Router();

router.get("/", booksController.index);

router.get("/search", booksController.search);

router.get("/add", booksController.getAdd);

router.get("/:id/delete", booksController.delete);

router.get("/:id/update", booksController.getUpdate);

router.post("/add", booksController.postAdd);

router.post("/:id/update", booksController.postUpdate);

module.exports = router;
