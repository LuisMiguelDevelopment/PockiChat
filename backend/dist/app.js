import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectionDB } from "./config/db.js";
/**
 * Inicio de la aplicación de express para el uso de la REST API
 * @see {@link https://www.npmjs.com/package/express}
 * @returns {Application}
 */
const app = express();
/**
 * Opciones de configuración para el manejo de CORS.
 * @property {string} origin - La URL de origen permitida.
 * @property {string[]} methods - Los métodos HTTP permitidos.
 * @property {string[]} allowedHeaders - Los encabezados permitidos en las solicitudes CORS.
 */
const options = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(options));
app.use(bodyParser.json({ limit: "10mb" }));
connectionDB();
const APILINK = "/api";
//const appRoutes: IRouter[] =Object.values(routes)
export { app };
