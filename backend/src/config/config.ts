import { config } from "dotenv";

/**
 * Configura y obtiene las variables de entorno de la aplicación
 * @example process.env.PORT
 */

config();

const PORT = process.env.PORT ?? 3000;
const FRONTEND_URL = process.env.FRONTEND_URL ?? "";
const DB_USER = process.env.DB_USER ?? "";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_HOST = process.env.DB_HOST ?? "";
const DB_DATABASE = process.env.DB_DATABASE ?? "";
const DB_PORT = process.env.DB_PORT ?? "";

export {
  PORT,
  FRONTEND_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
};
