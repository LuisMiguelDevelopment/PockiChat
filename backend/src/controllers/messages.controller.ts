import { type Request, type Response } from "express";
import { AIRequest, AIResponse } from "../interface/messages.interfaces";
import axios from "axios";
import {
  insertMessage,
  getMessagesCount,
  getMessageHistory,
} from "../services/message.service.js";

const AI_URL =
  "http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse";

const BOT_BIEVENIDA =
  "¡Hola! Soy Pocki, tu asistente virtual. ¿En qué puedo ayudarte hoy?";


/**
 * Obtiene la respuesta de la IA.
 * @param {Request} req - Request.
 * @param {Response} res - Response.
 * @returns {Promise} Promise con la respuesta.
 * @throws {Error} Error - Error al obtener la respuesta de la IA.

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

    const history = await getMessageHistory(connection);

    const messages = history.map((message) => ({
      role: message.sender === "bot" ? "bot" : "user",
      content: message.content,
    }));

    messages.push({ role: "user", content: input });

    const formattedHistory = messages
      .map((m) => `${m.role === "bot" ? "Bot" : "Usuario"}: ${m.content}`)
      .join("\n");

    const response = await axios.post<AIResponse>(AI_URL, {
      input: formattedHistory,
    });

    botResponse = response.data.choices[0].message.content;

    await insertMessage(connection, botResponse, "bot");

    connection.release();

    res.json({
      user_message: input,
      bot_response: botResponse,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la respuesta de la IA", error });
    return;
  }
};
