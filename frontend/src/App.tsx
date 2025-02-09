import { useEffect, useState, useRef } from "react";
import { usePockiContext } from "./context/pocki.context";
import { Box, Button, Heading, Image, Input, Text } from "@chakra-ui/react";
import robot from "/robot.gif";
import dragon from "/dragon.gif";
import { IoSend } from "react-icons/io5";
import { RiResetRightLine } from "react-icons/ri";
function App() {
  // Contexto de Pocki con funciones y estados necesarios
  const {
    ObtenerHistorial,
    historial,
    ObtenerRespuestaIA,
    cargando,
    ResetearChat,
  } = usePockiContext();
  const [mensaje, setMensaje] = useState(""); // Estado para manejar el mensaje del usuario
  const [mensajes, setMensajes] = useState(historial); // Estado local para gestionar los mensajes del chat
  const chatRef = useRef<HTMLDivElement>(null); // Referencia para el área del chat, utilizada para el scroll automático

  /**
   * Carga el historial de mensajes al montar el componente.
   */
  useEffect(() => {
    const cargarChat = async () => {
      try {
        ObtenerHistorial();
      } catch (error) {
        console.log("Error al obtener el historial", error);
      }
    };
    cargarChat();
  }, []);

  /**
   * Desplaza automáticamente el chat al final cuando cambian los mensajes.
   */

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes]);

  /**
   * Desplaza el chat al final cuando cambia el historial o los mensajes.
   */

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [historial, mensajes]);

  /**
   * Maneja el envío de mensajes del usuario.
   */
  const manejarEnvio = async () => {
    if (!mensaje.trim()) return;

    const nuevoMensajeUsuario = { sender: "user", content: mensaje };
    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setMensaje("");

    try {
      const respuesta = await ObtenerRespuestaIA(mensaje);
      const nuevoMensajePocki = { sender: "bot", content: respuesta };
      setMensajes((prev) => [...prev, nuevoMensajePocki]);
    } catch (error) {
      console.log("Error al obtener la respuesta de IA ", error);
    }
  };

  /**
   * Maneja el reseteo del chat.
   */
  const handleReset = async () => {
    try {
      await ResetearChat();
    } catch (error) {
      console.log("Error al resetear el chat", error);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      height={"100vh"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        w={{ base: "100%", md: "500px" }}
        m={{ base: 2, md: 0 }}
        bg={"#632AE7"}
        borderRadius={"20px"}
        position={"relative"}
      >
        <Box>
          <Image src={robot} alt="react logo" height={200} />
          <Heading as="h1" size="2xl" textAlign={"center"} fontSize={"3.2rem"}>
            Pocki{" "}
          </Heading>
        </Box>
        {/* Contenedor del chat */}
        <Box
          bg={"white"}
          color={"#4A4A4A"}
          borderRadius={"20px"}
          border={"2px #632AE7 solid"}
          mt={4}
          overflowY="auto"
          height={{ base: "450px", md: "600px" }}
          display="flex"
          flexDirection="column"
        >
          <Box flex="1" overflowY="auto" p={2} ref={chatRef}>
            {historial.length > 0 ? (
              historial
                .concat(cargando ? [{ sender: "bot", content: "..." }] : [])
                .map(
                  (
                    item: { sender: string; content: string },
                    index: number
                  ) => (
                    <Box
                      key={index}
                      p={2}
                      display="flex"
                      justifyContent={item.sender === "user" ? "end" : "init"}
                      flexDir={item.sender === "user" ? "row-reverse" : "init"}
                    >
                      <Image
                        src={item.sender === "user" ? dragon : robot}
                        alt="avatar"
                        height={50}
                      />
                      <Box
                        ml={2}
                        bg={item.sender === "bot" ? "#D3D3D3" : "#EAEAEA"}
                        p={2}
                        borderRadius="10px"
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <Text>{item.content}</Text>
                      </Box>
                    </Box>
                  )
                )
            ) : (
              <Text>No hay historial disponible</Text>
            )}
          </Box>
          {/* Campo de entrada y botón de envío */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="sticky"
            bottom="0"
            bg="white"
            w="100%"
            p={2}
          >
            <Box borderRadius="20px" bg="#EAEAEA" w="100%" p={1}>
              <Input
                type="text"
                placeholder="Pregúntale a Pocki"
                border="none"
                h={50}
                p={2}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") manejarEnvio();
                }}
              />
            </Box>
            <Button
              ml={2}
              bg="#632AE7"
              borderRadius="50%"
              h={50}
              w={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={manejarEnvio}
            >
              <IoSend size={30} color="white" />
            </Button>
          </Box>

          {/* Botón de reset */}
          <Button
            ml={2}
            bg="#white"
            borderRadius="50%"
            h={50}
            w={50}
            display="flex"
            justifyContent="center"
            alignItems="center"
            position={"absolute"}
            top={15}
            onClick={handleReset}
          >
            <RiResetRightLine size={30} color="#632AE7" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
