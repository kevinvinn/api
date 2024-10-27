const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.post("/cart", CartController.addToCart);
router.get("/cart/:userId", CartController.getCartByUserId);
router.delete("/cart/:cartItemId", CartController.removeFromCart);

module.exports = router;
