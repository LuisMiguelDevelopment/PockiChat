import axios from "./axios";

export const ObtenerRespuestaIARequest = (input: string) => {
  return axios.post("/messages", { message: input });
};

export const ObtenerHistorialRequest = () => axios.get("/messages");
