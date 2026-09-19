const express = require("express");

const productRoutes = require("./src/routes/productRoutes");

const {
  swaggerUi,
  swaggerSpec
} = require("./src/swagger/swagger");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "E-Commerce Product Catalog API is running",
    version: "1.0.0",
    documentation: "/api-docs"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "RESOURCE_NOT_FOUND",
      message: "The requested endpoint does not exist."
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    `Swagger UI running at http://localhost:${PORT}/api-docs`
  );
});