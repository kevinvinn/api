const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SECRET_KEY = "ambatushopcihuy"; // Ganti dengan kunci rahasia Anda

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Periksa password
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah." });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Payload
      SECRET_KEY, // Kunci rahasia
      { expiresIn: "1h" } // Masa berlaku token
    );

    res.status(200).json({ message: "Login berhasil.", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login.", error });
  }
};

// Register as Customer
exports.registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password sebelum menyimpan ke database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newCustomer = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Menyimpan password yang sudah di-hash
        role: "CUSTOMER", // Tetapkan role secara otomatis
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Failed to register as customer" });
  }
};

// Register as Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body; // Tidak perlu input role
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Hash password sebaiknya digunakan di real scenario
        role: "ADMIN", // Tetapkan role secara otomatis
      },
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to register as admin" });
  }
};
