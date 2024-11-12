// app.js
const cors = require("cors");
const express = require("express");
const app = express();
const apiKeyRoutes = require("./routes/ApiKeyRoutes");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
// const apiKeyRoutes = require("./routes/ApiKeyRoutes"); // Hapus ini jika tidak diperlukan

// Middleware untuk parsing JSON
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("aku di sini cuy ahay 7 deh");
});

// Middleware Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute
app.use(
  "/api/v1/apikey",
  (req, res, next) => {
    console.log("API key route accessed");
    next();
  },
  apiKeyRoutes
);
// Hapus jika tidak diperlukan
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("Error encountered:", err);
  res.status(500).json({ error: "An error occurred on the server." });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
