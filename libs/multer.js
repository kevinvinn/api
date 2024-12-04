const multer = require("multer");

const storage = multer.memoryStorage(); // Gunakan memory storage untuk menyimpan buffer gambar sementara

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error(
        "Hanya file dengan format JPG, JPEG, dan PNG yang diizinkan."
      );
      cb(err, false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // Maksimal ukuran file 2MB
  },
});

module.exports = upload;
