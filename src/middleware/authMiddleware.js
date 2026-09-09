const jwt = require("jsonwebtoken");

const SECRET_KEY = "my-development-secret";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: {
        code: "AUTHENTICATION_REQUIRED",
        message: "Authorization header is required."
      }
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: {
        code: "INVALID_AUTH_HEADER",
        message: "Authorization header must use Bearer authentication."
      }
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "The provided access token is invalid or expired."
      }
    });
  }
};

module.exports = {
  authenticateToken,
  SECRET_KEY
};
