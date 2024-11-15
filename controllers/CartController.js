const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a cart for user
exports.createCart = async (req, res) => {
  const { userId } = req.body;

  // Memeriksa apakah userId ada
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Cek apakah cart sudah ada untuk user ini
    const existingCart = await prisma.cart.findUnique({
      where: { userId: Number(userId) }, // Pastikan userId diubah menjadi angka
    });

    if (existingCart) {
      return res
        .status(400)
        .json({ error: "Cart already exists for this user" });
    }

    // Buat cart baru
    const cart = await prisma.cart.create({
      data: {
        userId: Number(userId), // Pastikan untuk mengubah userId menjadi angka
      },
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Failed to create cart" });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  const { cartId, items } = req.body;

  try {
    // Pastikan cartId valid
    const existingCart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!existingCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Array untuk menyimpan item yang berhasil ditambahkan
    const addedItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      // Validasi input di setiap elemen items
      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ error: "Each item must include productId and quantity" });
      }

      // Tambahkan item ke cartItem
      const cartItem = await prisma.cartItem.create({
        data: {
          cart: {
            connect: { id: cartId },
          },
          product: {
            connect: { id: productId },
          },
          quantity: quantity,
        },
      });

      addedItems.push(cartItem);
    }

    res.status(201).json({
      message: "Items added to cart successfully",
      addedItems,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({
      error: "Failed to add product to cart",
      details: error.message,
    });
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
    console.error("Error retrieving cart:", error);
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
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// Update quantity of a cart item or remove if quantity is 0
exports.updateCartItemQuantity = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  // Memeriksa apakah quantity disediakan dan valid
  if (quantity === undefined) {
    return res.status(400).json({ error: "Quantity is required" });
  }

  try {
    // Cek apakah cart item ada
    const existingCartItem = await prisma.cartItem.findUnique({
      where: { id: Number(cartItemId) },
    });

    if (!existingCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Jika quantity adalah 0, hapus item dari cart
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: Number(cartItemId) },
      });
      return res.status(200).json({ message: "Item removed from cart" });
    }

    // Update quantity jika quantity lebih besar dari 0
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: Number(cartItemId) },
      data: { quantity: Number(quantity) },
    });

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Failed to update cart item quantity" });
  }
};
