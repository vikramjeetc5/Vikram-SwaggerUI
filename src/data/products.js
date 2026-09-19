let products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    category: "electronics",
    price: 199.99,
    stock: 45,
    status: "in_stock"
  },
  {
    id: 2,
    name: "Ergonomic Mesh Desk Chair",
    category: "furniture",
    price: 249.50,
    stock: 12,
    status: "in_stock"
  },
  {
    id: 3,
    name: "Stainless Steel Insulated Water Bottle",
    category: "accessories",
    price: 25.00,
    stock: 0,
    status: "out_of_stock"
  },
  {
    id: 4,
    name: "Mechanical Gaming Keyboard",
    category: "electronics",
    price: 89.99,
    stock: 8,
    status: "in_stock"
  }
];

let nextId = 5;

module.exports = {
  products,
  getNextId: () => nextId++
};