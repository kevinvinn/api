const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const authMiddleware = require("../middleware/auth"); // Import middleware

router.post("/orders", authMiddleware, OrderController.createOrder);
router.get(
  "/orders/user/:userId",
  authMiddleware,
  OrderController.getOrdersByUserId
);
router.put(
  "/orders/:id/status",
  authMiddleware,
  OrderController.updateOrderStatus
);

module.exports = router;
