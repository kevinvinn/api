const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

router.post("/products", authMiddleware, ProductController.createProduct);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);
router.put("/products/:id", authMiddleware, ProductController.updateProduct);
router.delete("/products/:id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
