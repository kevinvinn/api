// app.js
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

// Middleware Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute
app.use("/api/v1/apikey", apiKeyRoutes); // Hapus jika tidak diperlukan
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", categoryRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
