const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce Product Catalog API",
      version: "1.0.0",
      description: `
# E-Commerce Product Catalog API

Welcome to the **Product Catalog API** reference. This service enables store managers and developers to manage inventory, update product listings, and query store items.

---

## 🚀 Quickstart Guide

If you are exploring this interactive API documentation for the first time:

1. **Expand an Endpoint:** Click on any route below (for example, \`GET /api/products\`).
2. **Test Interactive Calls:** Click the **Try it out** button located in the top-right corner of the endpoint block.
3. **Execute Requests:** Fill in any desired query parameters or payload values, then click **Execute**.
4. **Inspect Results:** Scroll down to the **Server Response** section to examine the returned HTTP status code and JSON payload.

---

## 📌 Querying & Usage Features

### 1. Filtering Parameters
When fetching items using \`GET /api/products\`, you can apply multiple filters:
- **Category Filter:** Performs a case-insensitive search (e.g., \`category=electronics\`).
- **Status Filter:** Filters items by inventory availability (\`in_stock\`, \`out_of_stock\`, \`discontinued\`).

### 2. Sorting Results
Pass field names to the \`sort\` query parameter to reorder returned arrays:
- \`sort=price\` — Sorts by price ascending (lowest to highest).
- \`sort=-price\` — Sorts by price descending (highest to lowest).
- \`sort=name\` — Sorts alphabetically by product title.

### 3. Pagination Controls
Result arrays are paginated to maintain fast response speeds:
- Default page size: \`10\` items per response block.
- Example request: \`/api/products?page=1&limit=5\`

---

## ⚠️ Standard Error Handling

All error responses output a uniform JSON structure across every endpoint:

\`\`\`json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "No product exists with ID 99."
  }
}
\`\`\`

| Status Code | Meaning | Common Cause |
| :--- | :--- | :--- |
| **400 Bad Request** | Validation Error | Missing required fields, invalid negative numbers for price/stock. |
| **404 Not Found** | Missing Resource | Requesting an invalid or deleted product ID. |
| **409 Conflict** | Resource Duplicate | Creating a product using a name that already exists in the catalog. |
      `
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server"
      }
    ],
    tags: [
      {
        name: "Products",
        description: "Endpoints for managing store inventory records"
      }
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Wireless Noise-Canceling Headphones" },
            category: { type: "string", example: "electronics" },
            price: { type: "number", format: "float", example: 199.99 },
            stock: { type: "integer", example: 45 },
            status: { type: "string", enum: ["in_stock", "out_of_stock", "discontinued"], example: "in_stock" }
          }
        },
        ProductCreateInput: {
          type: "object",
          required: ["name", "category", "price"],
          properties: {
            name: { type: "string", example: "Bluetooth Speaker" },
            category: { type: "string", example: "electronics" },
            price: { type: "number", format: "float", example: 49.99 },
            stock: { type: "integer", default: 0, example: 20 },
            status: { type: "string", enum: ["in_stock", "out_of_stock", "discontinued"], example: "in_stock" }
          }
        },
        ProductUpdateInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Bluetooth Speaker Pro" },
            category: { type: "string", example: "electronics" },
            price: { type: "number", format: "float", example: 59.99 },
            stock: { type: "integer", example: 15 },
            status: { type: "string", enum: ["in_stock", "out_of_stock", "discontinued"], example: "in_stock" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "PRODUCT_NOT_FOUND" },
                message: { type: "string", example: "No product exists with ID 99." }
              }
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec
};