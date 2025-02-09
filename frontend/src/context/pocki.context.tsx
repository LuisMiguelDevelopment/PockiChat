import { createContext, useContext, ReactNode, useState } from "react";
import {
  ObtenerRespuestaIARequest,
  ObtenerHistorialRequest,
  ResetearChatRequest,
} from "@/api/pocki";

interface PockiContextType {
  /**
   * Obtiene el historial de mensajes del chat.
   * @returns {Promise<any>} Promesa con el historial de mensajes.
   */

  ObtenerHistorial: () => Promise<any>;
  /**
   * Obtiene la respuesta de la IA a un mensaje.
   * @param {string} input - Mensaje del usuario.
   * @returns {Promise<any>} Promesa con la respuesta de la IA.
   */
  ObtenerRespuestaIA: (input: string) => Promise<any>;

  /**
   * Resetea el chat.
   * @returns {Promise<void>} Promesa vacía.
   */
  ResetearChat: () => Promise<void>;

  /**
   * Historial de mensajes del chat.
   */

  historial: Array<any>;
  /**
   * Última respuesta de la IA.
   */
  respuestaIA: Array<any>;

  /**
   * Indica si se está cargando una petición a la IA.
   */
  cargando: boolean;
}

// Crear un contexto de React
export const PockiContext = createContext<PockiContextType | undefined>(
  undefined
);

interface MyContextProviderProps {
  children: ReactNode;
}

export const usePockiContext = () => {
  const context = useContext(PockiContext);
  if (!context) {
    throw new Error("usePockiContext must be used within a PockiProvider");
  }
  return context;
};

export const PockiContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [historial, setHistorial] = useState([]);
  const [respuestaIA, setRespuestaIA] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Funciones para obtener el historial, la respuesta de IA y resetear el chat
  const ObtenerHistorial = async () => {
    try {
      const response = await ObtenerHistorialRequest();
      const data = response.data;
      console.log(data);
      setHistorial(data);
    } catch (error) {
      console.error("Error al obtener el historial", error);
      return [];
    }
  };

  // Función para obtener la respuesta de IA
  const ObtenerRespuestaIA = async (input: string) => {
    setCargando(true);
    try {
      console.log(input);
      const response = await ObtenerRespuestaIARequest(input);
      setRespuestaIA(response.data);
      await ObtenerHistorial();
      setCargando(false);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la respuesta de IA", error);
      return [];
    }
  };

  // Función para resetear el chat
  const ResetearChat = async () => {
    try {
      await ResetearChatRequest();
      setHistorial([]);
      setRespuestaIA([]);
      await ObtenerHistorial();
    } catch (error) {
      console.error("Error al resetear el chat", error);
    }
  };

  const pockiContextValue = {
    ObtenerHistorial,
    ObtenerRespuestaIA,
    ResetearChat,
    historial,
    respuestaIA,
    cargando,
  };

  return (
    <PockiContext.Provider value={pockiContextValue}>
      {children}
    </PockiContext.Provider>
  );
};
