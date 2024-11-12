// middleware/auth.js
const ALLOWED_API_KEY = "ambatushopcihuy"; // Ganti dengan API key tetap

function verifyStaticApiKey(req, res, next) {
  const apiKey = req.headers["header-api-key"];

  // Cek apakah API key ada
  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "Masukkan API Key terlebih dahulu broku😒" });
  }

  // Cek apakah API key valid
  if (apiKey !== ALLOWED_API_KEY) {
    return res.status(403).json({ message: "API Key tidak valid" });
  }

  next();
}

module.exports = verifyStaticApiKey;
