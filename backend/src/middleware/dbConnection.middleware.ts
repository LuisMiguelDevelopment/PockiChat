import { NextFunction, type Request, type Response } from "express";
import { pool } from "../config/db.js";

/**
 * Middleware para obtener la conexión a la base de datos.
 * @param {Request} req - La solicitud.
 * @param {Response} res - La respuesta.
 * @param {NextFunction} next - La siguiente función.
 */

export const getConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const connection = await pool.promise().getConnection();
    (req as any).dbConnection = connection;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la conexión a la base de datos" });
  }
};
