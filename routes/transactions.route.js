const express = require("express");

const db = require("../db");
const generateId = require("../generateId");
const transactionsController = require("../controllers/transactions.controller");

const router = express.Router();

router.get("/", transactionsController.index);

router.get("/add", transactionsController.getAdd);

router.get("/search", transactionsController.search);

router.get("/:id/delete", transactionsController.delete);

router.post("/add", transactionsController.postAdd);

module.exports = router;
