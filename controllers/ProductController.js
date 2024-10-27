const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, stok, imgUrl, categoryId } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stok,
        imgUrl,
        categoryId,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stok, imgUrl } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stok, imgUrl },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
