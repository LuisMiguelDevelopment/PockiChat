import { createPool } from "mysql2";

import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
} from "./config.js";

/**
 * Conexión a la base de datos
 * @returns {Promise} createPool
 */

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  database: DB_DATABASE,
});

/**
 * Conexión a la base de datos
 * @returns {Promise} console.log
 */

export const connectionDB = async (): Promise<any> => {
    try {
        await pool.promise().query("SELECT 1");
        console.log("Conexión exitosa a la base de datos ");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
