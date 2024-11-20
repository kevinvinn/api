const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.get(
  "/users",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  UserController.getAllUsers
);
router.get(
  "/users/:id",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  UserController.getUserById
);
router.put(
  "/users/:id",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  UserController.updateUser
);
router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  UserController.deleteUser
);

module.exports = router;
