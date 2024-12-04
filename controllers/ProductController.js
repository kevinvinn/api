const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imageKit");

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, stok, categoryId } = req.body;

  try {
    // Periksa apakah file gambar diunggah
    if (!req.file) {
      return res.status(400).json({ error: "Gambar produk wajib diunggah." });
    }

    // Upload gambar ke ImageKit
    const uploadResult = await imagekit.upload({
      file: req.file.buffer, // Buffer dari Multer
      fileName: `product_${Date.now()}`, // Nama file unik
    });

    // Simpan produk ke database
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        stok: parseInt(stok),
        imgUrl: uploadResult.url, // URL gambar dari ImageKit
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat produk." });
    console.error(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan daftar produk." });
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
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan produk." });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stok, categoryId } = req.body;

  try {
    let imgUrl;
    if (req.file) {
      // Jika gambar diunggah, perbarui URL gambar
      const uploadResult = await imagekit.upload({
        file: req.file.buffer,
        fileName: `product_update_${Date.now()}`,
      });
      imgUrl = uploadResult.url;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseInt(price),
        stok: parseInt(stok),
        imgUrl: imgUrl || undefined, // Perbarui URL gambar jika ada gambar baru
        categoryId: parseInt(categoryId),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui produk." });
    console.error(error);
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Produk berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus produk." });
  }
};
