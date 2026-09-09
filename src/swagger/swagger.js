const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Customer Support & User Management API",
      version: "2.0.0",

      description: `
# Customer Support & User Management API

A REST API for managing customer and support-agent accounts.

## Authentication

Most endpoints require a JWT bearer token.

To authenticate:

1. Call **POST /api/auth/login**.
2. Copy the returned access token.
3. Click the **Authorize** button.
4. Enter the token using the following format:

\`Bearer <your-token>\`

## Pagination

The user listing endpoint supports pagination using the
\`page\` and \`limit\` query parameters.

Example:

\`GET /api/users?page=1&limit=10\`

## Filtering

Users can be filtered by:

- role
- status

Example:

\`GET /api/users?role=agent&status=active\`

## Sorting

Users can be sorted by name or age.

Prefix the field with \`-\` for descending order.

Example:

\`GET /api/users?sort=-age\`

## Error Handling

Errors use a consistent response structure:

\`\`\`json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "No user exists with ID 99."
  }
}
\`\`\`
      `
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ],

    tags: [
      {
        name: "Authentication",
        description: "Authentication and access-token operations"
      },
      {
        name: "Users",
        description: "Create, retrieve, update and delete users"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter the JWT returned by the login endpoint."
        }
      }
    }
  },

  apis: [
    "./src/routes/*.js"
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec
};
