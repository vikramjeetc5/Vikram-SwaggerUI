# ✦ E-Commerce Product Catalog API

### A RESTful microservice for inventory management, filtering, and OpenAPI 3.0 interactive documentation.

<br>

[![GitHub](https://img.shields.io/badge/GitHub-vikramjeetc5-181717?style=for-the-badge&logo=github)](https://github.com/vikramjeetc5)
[![Repository](https://img.shields.io/badge/Repository-Vikram--SwaggerUI-6366F1?style=for-the-badge&logo=github)](https://github.com/vikramjeetc5/Vikram-SwaggerUI)
[![Runtime](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/Express-v4-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Specification](https://img.shields.io/badge/OpenAPI-3.0-85EA2D?style=for-the-badge&logo=openapiinitiative)](https://swagger.io/specification/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Swagger_UI-22C55E?style=for-the-badge&logo=render)](https://vikram-swaggerui.onrender.com/api-docs)

<br>

**Engineered with precision — designed for clear developer experience and structured API documentation.**



---

## ◈ About

The **E-Commerce Product Catalog API** is a backend service built to demonstrate API design principles, proper error handling, query filtering, and interactive documentation using Swagger UI.

It provides a predictable interface for store operations—enabling clients to create, read, update, and delete inventory records while maintaining strict validation rules.

The primary goal of this project is to highlight **developer experience (DX)** by pairing clean JavaScript application design with production-ready, interactive OpenAPI documentation.

---

## ◇ Highlights





### 📐 API Design

Clean RESTful route structures, standard HTTP methods, and uniform JSON response envelopes.




### ⚡ Smart Querying

Built-in support for case-insensitive filtering, multi-field sorting, and dynamic response pagination.







### 🛡 Validation & Errors

Robust input validation with consistent, human-readable error payload bodies across all endpoints.




### 📖 Interactive Docs

Integrated Swagger UI interface rendering Markdown guides, request schemas, and live sandbox testing.





---

## ✦ Core Features

| Feature | Description |
|:---|:---|
| **Inventory CRUD** | Complete resource creation, retrieval, updates, and deletion |
| **Category & Status Filtering** | Filter records dynamically via query parameters (`electronics`, `in_stock`) |
| **Flexible Sorting** | Sort items ascending/descending by price (`price`, `-price`) or alphabetically by name (`name`) |
| **Offset Pagination** | Structured page controls returning total count, page indices, and page limits |
| **Schema Validation** | Type checks for non-negative numerical values and duplicate product names |
| **Interactive OpenAPI Docs** | Built-in UI at `/api-docs` allowing real-time request execution |

---

## 🛠 Technology Stack



| Layer | Technologies |
|:---:|:---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Documentation** | OpenAPI 3.0 / Swagger UI (`swagger-jsdoc`, `swagger-ui-express`) |
| **Architecture** | Controller-Route-Data separation (Layered Architecture) |
| **Environment** | CommonJS Modules, Node environment |



---

## 🏗 Project Architecture

The application follows a clean layered design, separating HTTP routing, business logic, and dataset models.

```text
Vikram-SwaggerUI/
│
├── src/
│   ├── controllers/
│   │   └── productController.js  # Business logic & request validation
│   ├── data/
│   │   └── products.js           # In-memory product dataset & ID helper
│   ├── routes/
│   │   └── productRoutes.js      # Endpoint definitions & JSDoc annotations
│   └── swagger.js                # OpenAPI configuration & Quickstart guide
│
├── server.js                     # Server initialization & middleware mounts
├── package.json                  # Dependencies and execution scripts
├── .gitignore                    # Version control exclusions
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v14 or higher)
* **npm** (v6 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vikramjeetc5/Vikram-SwaggerUI.git
   cd Vikram-SwaggerUI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   # or for development:
   node server.js
   ```

4. **Access the API & Documentation:**
   * **API Base URL:** `http://localhost:3000/api/products`
   * **Interactive Swagger UI:** `http://localhost:3000/api-docs`

---

## 📑 API Reference Quickstart

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/products` | Retrieve all products (supports `category`, `status`, `sort`, `page`, `limit`) |
| `GET` | `/api/products/:id` | Fetch a single product by numeric ID |
| `POST` | `/api/products` | Create a new product entry |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Remove a product from the catalog |

---

## ⚖ License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and distribute.