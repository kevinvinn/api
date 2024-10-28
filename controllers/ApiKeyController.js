// controllers/ApiKeyController.js
const ALLOWED_API_KEY = "ambatushopcihuy"; // API key statis

class ApiKeyController {
  static async generateApiKey(req, res) {
    // Mengembalikan API key statis
    return res.status(200).json({ apiKey: ALLOWED_API_KEY });
  }
}

module.exports = ApiKeyController;
