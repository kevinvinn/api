const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");
const upload = require("../libs/multer"); // Middleware Multer untuk upload gambar

// Routes untuk produk
router.post(
  "/products",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  upload.single("image"), // Middleware untuk upload gambar
  ProductController.createProduct
);

router.get("/products", ProductController.getAllProducts);

router.get("/products/:id", ProductController.getProductById);

router.put(
  "/products/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  upload.single("image"), // Middleware untuk upload gambar (opsional)
  ProductController.updateProduct
);

router.delete(
  "/products/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  ProductController.deleteProduct
);

module.exports = router;
