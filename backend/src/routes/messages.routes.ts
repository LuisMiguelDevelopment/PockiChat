import { type IRouter, Router } from "express";

import { ObtenerRespuestaIA } from "../controllers/messages.controller.js";

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


messagesRouter.post("/messages", ObtenerRespuestaIA);

export { messagesRouter };
