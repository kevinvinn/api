const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

router.post("/register", AuthController.registerCustomer); // Pastikan handler ini benar-benar ada dan terdefinisi
router.post("/register-admin", AuthController.registerAdmin);
router.post("/login", AuthController.login);
module.exports = router;
