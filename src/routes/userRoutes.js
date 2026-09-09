const express = require("express");

const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  authenticateToken
} = require("../middleware/authMiddleware");


/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         age:
 *           type: integer
 *           minimum: 18
 *           maximum: 100
 *           example: 25
 *         role:
 *           type: string
 *           enum:
 *             - customer
 *             - agent
 *           example: customer
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           example: active
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         age:
 *           type: integer
 *           minimum: 18
 *           maximum: 100
 *           example: 25
 *         role:
 *           type: string
 *           enum:
 *             - customer
 *             - agent
 *           default: customer
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *           default: active
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               example: USER_NOT_FOUND
 *             message:
 *               type: string
 *               example: No user exists with ID 99.
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 */


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a user
 *     description: Creates a new user account.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             name: Alice Johnson
 *             email: alice@example.com
 *             age: 27
 *             role: customer
 *             status: active
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       409:
 *         description: Email already exists
 */
router.post(
  "/",
  authenticateToken,
  createUser
);


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List users
 *     description: |
 *       Returns a paginated list of users.
 *
 *       Results can be filtered by role and status
 *       and sorted by name or age.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number.
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of users returned per page.
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum:
 *             - customer
 *             - agent
 *         description: Filter users by role.
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *         description: Filter users by account status.
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - age
 *             - -age
 *         description: Sort users by name or age.
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get(
  "/",
  authenticateToken,
  getAllUsers
);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  authenticateToken,
  getUserById
);


/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Partially update a user
 *     description: Updates one or more user fields.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             status: inactive
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.patch(
  "/:id",
  authenticateToken,
  updateUser
);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Permanently removes a user from the system.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  authenticateToken,
  deleteUser
);


module.exports = router;
