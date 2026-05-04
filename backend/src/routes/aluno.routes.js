const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
router.get("/notas/:id", alunoController.getBoletim);
router.get("/", alunoController.list);
router.post("/", alunoController.create);

module.exports = router;
