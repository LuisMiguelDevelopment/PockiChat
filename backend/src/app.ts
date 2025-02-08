import express, {
  type Express,
  type IRouter,
  type Response,
  type Request,
} from "express";
import cors, { type CorsOptions } from "cors";
import bodyParser from "body-parser";
import { connectionDB } from "./config/db.js";
import { swaggerConfig } from "./config/swaggerConfig.js";

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
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(options));
app.use(bodyParser.json({ limit: "10mb" }));

connectionDB();

swaggerConfig(app);

//const APILINK = "/api";

//const appRoutes: IRouter[] =Object.values(routes)

export { app };
