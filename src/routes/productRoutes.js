const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of catalog products
 *     description: Returns a paginated list of products with optional filtering by category or status and sorting by price or name.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination results.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of records to return per page.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter items by category (e.g., `electronics`, `furniture`).
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [in_stock, out_of_stock, discontinued]
 *         description: Filter items by inventory availability status.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, -price, name]
 *         description: Sort field. Use `-price` for descending order.
 *     responses:
 *       200:
 *         description: A paginated list of products.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Wireless Noise-Canceling Headphones"
 *                   category: "electronics"
 *                   price: 199.99
 *                   stock: 45
 *                   status: "in_stock"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 1
 *                 totalPages: 1
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Add a new product to the catalog
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateInput'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Validation error or invalid numerical inputs.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict. Product name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/").get(getAllProducts).post(createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get details for a specific product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique integer ID of the product.
 *     responses:
 *       200:
 *         description: Product details retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product ID not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique integer ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateInput'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Validation failure on request body parameters.
 *       404:
 *         description: Product ID not found.
 *
 *   delete:
 *     summary: Remove a product from the catalog
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique integer ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product ID not found.
 */
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;