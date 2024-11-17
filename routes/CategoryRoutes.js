const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

router.post("/categories", authMiddleware, CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.put(
  "/categories/:id",
  authMiddleware,
  CategoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  CategoryController.deleteCategory
);

module.exports = router;
