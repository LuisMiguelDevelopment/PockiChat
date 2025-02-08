import axios from "./axios";

export const ObtenerRespuestaIARequest = (input: string) => {
  return axios.post("/messages", { message: input });
};

export const ObtenerHistorialRequest = () => {
  return axios.get("/messages");
};
