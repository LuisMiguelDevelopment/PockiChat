import { type Request, type Response } from "express";
import { AIRequest, AIResponse } from "../interface/messages.interfaces";
import axios from "axios";
import {
  insertMessage,
  getMessagesCount,
  getMessageHistory,
  clearMessages,
} from "../services/message.service.js";

const AI_URL =
  "http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse";

const BOT_BIENVENIDA =
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
  const connection = req.dbConnection;

  if (!connection) {
    res
      .status(500)
      .json({ message: "Error al obtener la conexión a la base de datos" });
    return;
  }
  try {
    const { input } = req.body;

    const messagesCount = await getMessagesCount(connection);

    let botResponse = "";

    if (messagesCount === 0) {
      botResponse = BOT_BIENVENIDA;
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
  } finally {
    connection.release();
  }
};

/**
 * Obtiene el historial de mensajes.
 * @param {Request} req - Request.
 * @param {Response} res - Response.
 * @returns {Promise} Promise con el historial de mensajes.
 * @throws {Error} Error - Error al obtener el historial de mensajes.
 */

export const HistoryChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const connection = req.dbConnection;

  if (!connection) {
    res
      .status(500)
      .json({ message: "Error al obtener la conexión a la base de datos" });
    return;
  }
  try {
    const response = await getMessageHistory(connection);

    const messages = response.map((message: any) => ({
      sender: message.sender,
      content: message.content,
    }));

    res.json(messages);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el historial de mensajes", error });
    return;
  } finally {
    connection.release();
  }
};

/**
 * Reinicia el chat.
 * @param {Request} req - Request.
 * @param {Response} res - Response.
 * @returns {Promise} Promise con el mensaje de chat reiniciado.
 * @throws {Error} Error - Error al reiniciar el chat.
 */

export const ResetChat = async (req: Request, res: Response): Promise<void> => {
  const connection = req.dbConnection;

  if (!connection) {
    res
      .status(500)
      .json({ message: "Error al obtener la conexión a la base de datos" });
    return;
  }
  try {
    await clearMessages(connection);

    await insertMessage(connection, BOT_BIENVENIDA, "bot");

    connection.release();

    res.json({ message: "Chat reiniciado" });
  } catch (error) {
    res.status(500).json({ message: "Error al reiniciar el chat", error });
    return;
  } finally {
    connection.release();
  }
};
