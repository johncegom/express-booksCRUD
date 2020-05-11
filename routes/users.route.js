const express = require("express");

const db = require("../db");
const generateId = require("../generateId");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/", usersController.index);

router.get("/add", usersController.getAdd);

router.get("/search", usersController.search);

router.get("/:id/delete", usersController.delete);

router.get("/:id/update", usersController.getUpdate);

router.post("/add", usersController.postAdd);

router.post("/:id/update", usersController.postUpdate);

module.exports = router;
