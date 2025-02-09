import express, { type Express } from "express";
import cors, { type CorsOptions } from "cors";
import bodyParser from "body-parser";
import { FRONTEND_URL } from "./config/config.js";
import { connectionDB } from "./config/db.js";
import { swaggerConfig } from "./config/swaggerConfig.js";
import { messagesRouter } from "./routes/messages.routes.js";
/**
 * Inicio de la aplicación de express para el uso de la REST API
 * @see {@link https://www.npmjs.com/package/express}
 * @returns {Application}
 */

const app: Express = express();

/**
 * Opciones de configuración para el manejo de CORS.
 * @property {string} origin - La URL de origen permitida.
 * @property {string[]} methods - Los métodos HTTP permitidos.
 * @property {string[]} allowedHeaders - Los encabezados permitidos en las solicitudes CORS.
 */

const options: CorsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PATCH"],
  credentials: true,
};

app.use(cors(options));

//parsee peticiones a formato json
app.use(bodyParser.json({ limit: "10mb" }));

//Llamada conexion a la base de datos
connectionDB();

// Llamada de swaggerConfig
swaggerConfig(app);

//Api de los mensages
app.use("/api", messagesRouter);

export { app };
