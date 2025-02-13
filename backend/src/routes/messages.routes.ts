import { type IRouter, Router } from "express";

import {
  HistoryChat,
  ObtenerRespuestaIA,
  ResetChat,
} from "../controllers/messages.controller.js";
import { validateInput } from "../middleware/messages.middleware.js";
import { getConnection } from "../middleware/dbConnection.middleware.js";

const messagesRouter: IRouter = Router();

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Obtiene una respuesta de la IA
 *     description: Envía un mensaje y recibe una respuesta generada por IA.
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - input
 *             properties:
 *               input:
 *                 type: string
 *                 description: Texto de entrada para la IA.
 *                 example: "Hola, ¿cómo estás?"
 *     responses:
 *       200:
 *         description: Respuesta generada por la IA.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "¡Hola! Estoy bien, ¿y tú?"
 *       400:
 *         description: Error por falta de datos en la solicitud.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @Route POST /messages
 * @Description Obtiene una respuesta de la IA
 * @returns {Promise<Array>} - La respuesta de la IA.
 * @async
 */

messagesRouter.post(
  "/messages",
  validateInput,
  getConnection,
  ObtenerRespuestaIA
);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Obtiene el historial de mensajes.
 *     description: Obtiene el historial de mensajes.
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Historial de mensajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "¡Hola! Estoy bien, ¿y tú?"
 *                   sender:
 *                     type: string
 *                     example: "bot"
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @Route GET /messages
 * @Description Obtiene el historial del chat.
 * @returns {Promise<Array>} - Envia el array con el historial.
 * @async
 */

messagesRouter.get("/messages", getConnection, HistoryChat);

/**
 * @swagger
 * /reset-chat:
 *   post:
 *     summary: Reinicia el chat.
 *     description: Elimina todos los mensajes del chat.
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Mensajes eliminados.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @Route POST /messages
 * @Description Este endpoint borra el historial de mensajes del chat y añade un mensaje incial.
 * @returns {void} Chat reseteado 
 * @async
 */

messagesRouter.post("/reset-chat", getConnection, ResetChat);

export { messagesRouter };
