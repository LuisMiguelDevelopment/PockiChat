import { PoolConnection } from "mysql2/promise";

/**
 * Obtiene los mensajes.
 * @param {PoolConnection} connection - Conexión a la base de datos.
 * @returns {Promise} Promise con los mensajes.
 */
export const insertMessage = async (
  connection: PoolConnection,
  content: string,
  sender: string
): Promise<void> => {
  await connection.query(
    "INSERT INTO messages (content, sender) VALUES (?, ?)",
    [content, sender]
  );
};

/**
 * Obtiene el número de mensajes.
 * @param {PoolConnection} connection - Conexión a la base de datos.
 * @returns {Promise} Promise con el número de mensajes.
 */
export const getMessagesCount = async (
  connection: PoolConnection
): Promise<number> => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) as count FROM messages"
  );
  return (rows as any)[0].count;
};

/**
 * Obtiene el historial de mensajes.
 * @param {PoolConnection} connection - Conexión a la base de datos.
 * @returns {Promise} Promise con el historial de mensajes.
 */

export const getMessageHistory = async (
  connection: PoolConnection
): Promise<{ content: string; sender: string }[]> => {
  const [rows] = await connection.query(
    "SELECT content, sender FROM messages ORDER BY timestamps ASC"
  );
  return rows as { content: string; sender: string }[];
};






