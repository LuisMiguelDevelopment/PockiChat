import { type Request, type Response } from "express";
import { AIRequest, AIResponse } from "../interface/messages.interfaces";
import axios from "axios";

/**
 * Función para obtener la respuesta de la IA.
 * @param {Request<{}, {}, AIRequest>} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @returns {Promise<void>} - La respuesta de la IA.
 */

export const ObtenerRespuestaIA = async (
  req: Request<{}, {}, AIRequest>,
  res: Response
): Promise<void> => {
  try {
    const { input } = req.body;

    if (!input) {
      res.status(400).json({ message: "No se ha proporcionado un input" });
    }

    const result = await axios.post<AIResponse>(
      "http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse",
      {
        input,
      }
    );
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la respuesta de la IA" });
  }
};
