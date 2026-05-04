const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");

router.get("/", professorController.list);
router.post("/", professorController.create);
router.put("/lancar-nota", professorController.lancarNota);

module.exports = router;
