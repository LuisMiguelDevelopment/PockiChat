import axios from "./axios";

export const ObtenerRespuestaIARequest = (input: string) =>
  axios.post("/messages", { input });

export const ObtenerHistorialRequest = () => axios.get("/messages");

export const ResetearChatRequest = () => axios.post("/reset-chat");
