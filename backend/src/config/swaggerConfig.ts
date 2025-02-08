import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";
import { PORT } from "./config.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de PockiChat",
      version: "1.0.0",
      description: "Documentación de la API de PockiChat",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ["./routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Configuración de Swagger
 * @param {Express} app - La aplicación de Express.
 */

export const swaggerConfig = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
