import { type Request, type Response } from "express";
import { AIRequest, AIResponse } from "../interface/messages.interfaces";
import axios from "axios";

import { pool } from "../config/db.js";

const AI_URL =
  "http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse";

const BOT_BIEVENIDA =
  "¡Hola! Soy Pocki, tu asistente virtual. ¿En qué puedo ayudarte hoy?";

/**
 * Función para obtener la respuesta de la IA.
 * @param {Request<{}, {}, AIRequest>} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @returns {Promise<Response>} - La respuesta de la IA.
 */

export const ObtenerRespuestaIA = async (
  req: Request<{}, {}, AIRequest>,
  res: Response
): Promise<void> => {
  try {
    const { input } = req.body;

    const connection = await pool.promise().getConnection();

    const [rows] = await connection.query(
      "SELECT COUNT(*) as count FROM messages"
    );
    const messagesCount = (rows as any)[0].count;

    let botResponse = "";

    if (messagesCount === 0) {
      botResponse = BOT_BIEVENIDA;
      await connection.query(
        "INSERT INTO messages (content, sender) VALUES (?, ?)",
        [botResponse, "bot"]
      );
      connection.release();
      res.status(200).json({ message: botResponse });
      return;
    }

    if (!input) {
      res.status(400).json({ message: "No se ha proporcionado un input" });
      return;
    }

    await connection.query(
      "INSERT INTO messages (content, sender) VALUES (?, ?)",
      [input, "user"]
    );

    const response = await axios.post<AIResponse>(AI_URL, { input });
    botResponse = response.data.choices[0].message.content;

    await connection.query(
      "INSERT INTO messages (content, sender) VALUES (?, ?)",
      [botResponse, "bot"]
    );

    connection.release();

    res.json({
      user_message: input,
      bot_response: botResponse,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la respuesta de la IA" });
    return;
  }
};
