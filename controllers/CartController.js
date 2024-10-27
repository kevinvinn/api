const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add product to cart
exports.addToCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: { cartItems: { include: { product: true } } },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await prisma.cartItem.delete({
      where: { id: Number(cartItemId) },
    });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
