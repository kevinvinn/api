const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve category" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
