const jwt = require("jsonwebtoken");
const SECRET_KEY = "ambatushopcihuy"; // Ganti dengan kunci rahasia Anda

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token tidak ditemukan atau tidak valid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifikasi token
    req.user = decoded; // Menyimpan data user ke dalam req untuk digunakan di controller
    next();
  } catch (error) {
    res.status(403).json({ message: "Token tidak valid." });
  }
}

function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak. Anda tidak memiliki izin." });
    }
    next();
  };
}

module.exports = {
  authorizeRoles, // Ganti nama agar mendukung multiple roles
  authMiddleware,
};
