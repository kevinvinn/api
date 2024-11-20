const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");
router.post(
  "/orders",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  OrderController.createOrder
);
router.get(
  "/orders/user/:userId",
  authMiddleware,
  authorizeRoles(["ADMIN", "USER"]),
  OrderController.getOrdersByUserId
);
router.put(
  "/orders/:id/status",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  OrderController.updateOrderStatus
);

module.exports = router;
