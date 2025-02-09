import { createContext, useContext, ReactNode, useState } from "react";
import {
  ObtenerRespuestaIARequest,
  ObtenerHistorialRequest,
} from "@/api/pocki";

interface PockiContextType {
  ObtenerHistorial: () => Promise<any>;
  ObtenerRespuestaIA: (input: string) => Promise<any>;
  historial: Array<any>;
  respuestaIA: Array<any>;
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

  const pockiContextValue = {
    ObtenerHistorial,
    ObtenerRespuestaIA,
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
