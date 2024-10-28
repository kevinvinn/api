const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const authMiddleware = require("../middleware/auth"); // Import middleware

router.post("/cart/create", authMiddleware, CartController.createCart);
router.post("/cart", authMiddleware, CartController.addToCart);
router.put(
  "/cart/item/:cartItemId",
  authMiddleware,
  CartController.updateCartItemQuantity
);
router.get("/cart/:userId", authMiddleware, CartController.getCartByUserId);
router.delete(
  "/cart/:cartItemId",
  authMiddleware,
  CartController.removeFromCart
);

module.exports = router;
