const express = require("express");

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

const {
  swaggerUi,
  swaggerSpec
} = require("./src/swagger/swagger");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Customer Support API is running",
    version: "2.0.0",
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
