const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.post(
  "/categories",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  CategoryController.createCategory
);
router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.put(
  "/categories/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  CategoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  CategoryController.deleteCategory
);

module.exports = router;
