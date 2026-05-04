const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.dashboard);
router.get("/matriculas", adminController.listarMatriculas);
router.post("/matricular", adminController.matricular);

module.exports = router;
