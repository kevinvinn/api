const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");
router.post(
  "/cart/create",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  CartController.createCart
);
router.post(
  "/cart",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  CartController.addToCart
);
router.put(
  "/cart/item/:cartItemId",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  CartController.updateCartItemQuantity
);
router.get(
  "/cart/:userId",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  CartController.getCartByUserId
);
router.delete(
  "/cart/:cartItemId",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  CartController.removeFromCart
);

module.exports = router;
