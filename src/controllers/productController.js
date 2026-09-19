const { products, getNextId } = require("../data/products");

// CREATE PRODUCT
const createProduct = (req, res) => {
  const {
    name,
    category,
    price,
    stock = 0,
    status = stock > 0 ? "in_stock" : "out_of_stock"
  } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "name, category, and price are required fields."
      }
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: {
        code: "INVALID_PRICE",
        message: "Price must be a positive number greater than 0."
      }
    });
  }

  if (typeof stock !== "number" || stock < 0) {
    return res.status(400).json({
      error: {
        code: "INVALID_STOCK",
        message: "Stock cannot be a negative value."
      }
    });
  }

  const existingProduct = products.find(
    p => p.name.toLowerCase() === name.toLowerCase()
  );

  if (existingProduct) {
    return res.status(409).json({
      error: {
        code: "PRODUCT_ALREADY_EXISTS",
        message: "A product with this name already exists in the catalog."
      }
    });
  }

  const newProduct = {
    id: getNextId(),
    name,
    category: category.toLowerCase(),
    price,
    stock,
    status
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
};

// GET ALL PRODUCTS
const getAllProducts = (req, res) => {
  let result = [...products];

  const {
    page = 1,
    limit = 10,
    category,
    status,
    sort
  } = req.query;

  // Filtering
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (status) {
    result = result.filter(p => p.status === status);
  }

  // Sorting
  if (sort === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "-price") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const startIndex = (pageNumber - 1) * limitNumber;

  const paginatedProducts = result.slice(
    startIndex,
    startIndex + limitNumber
  );

  res.status(200).json({
    data: paginatedProducts,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total: result.length,
      totalPages: Math.ceil(result.length / limitNumber)
    }
  });
};

// GET PRODUCT BY ID
const getProductById = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: `No product exists with ID ${id}.`
      }
    });
  }

  res.status(200).json(product);
};

// UPDATE PRODUCT
const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: `No product exists with ID ${id}.`
      }
    });
  }

  const { name, category, price, stock, status } = req.body;

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    return res.status(400).json({
      error: {
        code: "INVALID_PRICE",
        message: "Price must be a positive number greater than 0."
      }
    });
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return res.status(400).json({
      error: {
        code: "INVALID_STOCK",
        message: "Stock cannot be a negative value."
      }
    });
  }

  if (name !== undefined) product.name = name;
  if (category !== undefined) product.category = category.toLowerCase();
  if (price !== undefined) product.price = price;
  if (stock !== undefined) {
    product.stock = stock;
    product.status = stock === 0 ? "out_of_stock" : product.status;
  }
  if (status !== undefined) product.status = status;

  res.status(200).json({
    message: "Product updated successfully",
    product
  });
};

// DELETE PRODUCT
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: `No product exists with ID ${id}.`
      }
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct[0]
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};