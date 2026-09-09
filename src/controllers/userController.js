const { users, getNextId } = require("../data/users");

// CREATE USER
const createUser = (req, res) => {
  const {
    name,
    email,
    age,
    role = "customer",
    status = "active"
  } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "name, email and age are required."
      }
    });
  }

  if (age < 18 || age > 100) {
    return res.status(400).json({
      error: {
        code: "INVALID_AGE",
        message: "Age must be between 18 and 100."
      }
    });
  }

  const existingUser = users.find(
    user => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      error: {
        code: "EMAIL_ALREADY_EXISTS",
        message: "A user with this email already exists."
      }
    });
  }

  const newUser = {
    id: getNextId(),
    name,
    email,
    age,
    role,
    status
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
};


// GET ALL USERS
const getAllUsers = (req, res) => {
  let result = [...users];

  const {
    page = 1,
    limit = 10,
    role,
    status,
    sort
  } = req.query;

  // Filtering
  if (role) {
    result = result.filter(user => user.role === role);
  }

  if (status) {
    result = result.filter(user => user.status === status);
  }

  // Sorting
  if (sort === "age") {
    result.sort((a, b) => a.age - b.age);
  }

  if (sort === "-age") {
    result.sort((a, b) => b.age - a.age);
  }

  if (sort === "name") {
    result.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  // Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const startIndex =
    (pageNumber - 1) * limitNumber;

  const paginatedUsers = result.slice(
    startIndex,
    startIndex + limitNumber
  );

  res.status(200).json({
    data: paginatedUsers,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total: result.length,
      totalPages: Math.ceil(
        result.length / limitNumber
      )
    }
  });
};


// GET USER BY ID
const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(
    user => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: `No user exists with ID ${id}.`
      }
    });
  }

  res.status(200).json(user);
};


// UPDATE USER
const updateUser = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(
    user => user.id === id
  );

  if (!user) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: `No user exists with ID ${id}.`
      }
    });
  }

  const {
    name,
    email,
    age,
    role,
    status
  } = req.body;

  if (age !== undefined && (age < 18 || age > 100)) {
    return res.status(400).json({
      error: {
        code: "INVALID_AGE",
        message: "Age must be between 18 and 100."
      }
    });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;
  if (role !== undefined) user.role = role;
  if (status !== undefined) user.status = status;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
};


// DELETE USER
const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex(
    user => user.id === id
  );

  if (userIndex === -1) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: `No user exists with ID ${id}.`
      }
    });
  }

  const deletedUser = users.splice(
    userIndex,
    1
  );

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
