const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, totalPrice, orderItems } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders for a user
exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
