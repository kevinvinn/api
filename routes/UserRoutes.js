const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

router.get("/users", authMiddleware, UserController.getAllUsers);
router.get("/users/:id", authMiddleware, UserController.getUserById);
router.put("/users/:id", authMiddleware, UserController.updateUser);
router.delete("/users/:id", authMiddleware, UserController.deleteUser);

module.exports = router;
