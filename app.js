const express = require("express");
const app = express();
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", categoryRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
