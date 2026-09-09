let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 25,
    role: "customer",
    status: "active"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 30,
    role: "agent",
    status: "active"
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert@example.com",
    age: 42,
    role: "customer",
    status: "inactive"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    age: 28,
    role: "agent",
    status: "active"
  }
];

let nextId = 5;

module.exports = {
  users,
  getNextId: () => nextId++
};
