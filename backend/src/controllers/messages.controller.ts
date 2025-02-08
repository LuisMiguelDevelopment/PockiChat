import { type Request, type Response } from "express";
import { AIRequest, AIResponse } from "../interface/messages.interfaces";
import axios from "axios";
import {
  insertMessage,
  getMessagesCount,
} from "../services/message.service.js";

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

    const connection = req.dbConnection;

    if (!connection) {
      res
        .status(500)
        .json({ message: "Error al obtener la conexión a la base de datos" });
      return;
    }

    const messagesCount = await getMessagesCount(connection);

    let botResponse = "";

    if (messagesCount === 0) {
      botResponse = BOT_BIEVENIDA;
      await insertMessage(connection, botResponse, "bot");
      connection.release();
      res.status(200).json({ message: botResponse });
      return;
    }

    await insertMessage(connection, input, "user");

    const response = await axios.post<AIResponse>(AI_URL, { input });
    botResponse = response.data.choices[0].message.content;

    await insertMessage(connection, botResponse, "bot");

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
