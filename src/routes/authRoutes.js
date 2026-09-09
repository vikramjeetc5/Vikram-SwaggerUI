const express = require("express");
const jwt = require("jsonwebtoken");

const {
  SECRET_KEY
} = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: |
 *       Authenticates a user and returns a JWT access token.
 *
 *       Use the returned token in the Authorization header:
 *
 *       `Authorization: Bearer <token>`
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *               token: eyJhbGciOiJIUzI1NiIs...
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== "john@example.com" ||
    password !== "password123"
  ) {
    return res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Email or password is incorrect."
      }
    });
  }

  const token = jwt.sign(
    {
      userId: 1,
      email,
      role: "customer"
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  res.status(200).json({
    message: "Login successful",
    token
  });
});

module.exports = router;
