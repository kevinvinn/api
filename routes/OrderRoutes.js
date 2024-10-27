const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.post("/orders", OrderController.createOrder);
router.get("/orders/user/:userId", OrderController.getOrdersByUserId);
router.put("/orders/:id/status", OrderController.updateOrderStatus);

module.exports = router;
