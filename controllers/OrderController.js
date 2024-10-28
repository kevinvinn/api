const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order based on items in the user's cart
exports.createOrder = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Ambil semua cart items untuk user yang bersangkutan
    const cart = await prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });

    // Jika cart kosong, kirim pesan error
    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Hitung totalPrice berdasarkan cart items
    const totalPrice = cart.cartItems.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.quantity;
    }, 0);

    // Buat order baru dan tambahkan order items
    const newOrder = await prisma.order.create({
      data: {
        userId: Number(userId),
        totalPrice: totalPrice,
        orderItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.product.price), // Pastikan price dalam bentuk Float
          })),
        },
      },
    });

    // Hapus semua item dari cart setelah membuat order
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
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
