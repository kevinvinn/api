const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.post(
  "/products",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  ProductController.createProduct
);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);
router.put(
  "/products/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  ProductController.updateProduct
);
router.delete(
  "/products/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  ProductController.deleteProduct
);

module.exports = router;
