import axios from "axios";

//URL BASE obtenida de las variables de entorno
const axiosBaseUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Crea una instancia de Axios con la configuración predeterminada.
 *
 * @constant {import("axios").AxiosInstance} instance - Instancia de Axios configurada.
 * @property {string} baseURL - La URL base del backend con el prefijo `/api/`.
 * @property {boolean} withCredentials - Habilita el envío de cookies en las solicitudes.
 */

const instance = axios.create({
  baseURL: `${axiosBaseUrl}/api/`,
  withCredentials: true,
});

export default instance;
