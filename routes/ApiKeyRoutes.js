// routes/ApiKeyRoutes.js
const express = require("express");
const router = express.Router();
const ApiKeyController = require("../controllers/ApiKeyController");

// Endpoint untuk mendapatkan API key
router.get("/generate", ApiKeyController.generateApiKey);

module.exports = router;
