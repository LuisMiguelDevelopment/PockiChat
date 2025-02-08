import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar que se haya proporcionado un input en la solicitud.
 * @param {Request} req - La solicitud.
 * @param {Response} res - La respuesta.
 * @param {NextFunction} next - La siguiente función.
 */

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { input } = req.body;

  if (!input) {
    res.status(400).json({ message: "No se ha proporcionado un input" });
    return;
  }

  next();
};
