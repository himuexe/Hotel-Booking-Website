import swaggerJSDoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

// Read version from package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vacays API Documentation",
      version,
      description: "API documentation for the Vacays Hotel Booking Website",
      contact: {
        name: "API Support",
        url: "https://github.com/himuexe/Hotel-Booking-Website",
      },
    },
    servers: [
      {
        url: "http://localhost:7000",
        description: "Development server",
      },
      {
        url: "https://api.vacays.example.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Hotels",
        description: "Hotel management endpoints",
      },
      {
        name: "Bookings",
        description: "Booking management endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options); 