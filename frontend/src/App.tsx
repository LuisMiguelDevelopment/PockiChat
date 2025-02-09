import { useEffect, useState } from "react";
import { usePockiContext } from "./context/pocki.context";
import { Box, Button, Heading, Image, Input, Text } from "@chakra-ui/react";
import robot from "/robot.gif";
import dragon from "/dragon.gif";
import { IoSend } from "react-icons/io5";
function App() {
  const [count, setCount] = useState(0);
  const { ObtenerHistorial, historial } = usePockiContext();

  useEffect(() => {
    const prueba = async () => {
      try {
        ObtenerHistorial();
      } catch (error) {}
    };
    prueba();
  }, []);

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
        w={"500px"}
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
        <Box
          bg={"white"}
          color={"#4A4A4A"}
          borderRadius={"20px"}
          border={"2px #632AE7 solid"}
          mt={4}
          overflowY="auto"
          height={"600px"}
        >
          {historial.length > 0 ? (
            historial.map(
              (item: { sender: string; content: string }, index: number) => (
                <Box
                  key={index}
                  p={2}
                  display={"flex"}
                  justifyContent={"end"}
                  flexDir={item.sender === "user" ? "row-reverse" : "init"}
                >
                  <Image
                    src={item.sender === "user" ? dragon : robot}
                    alt="react logo"
                    height={50}
                  />
                  <Box ml={2} bg={"#EAEAEA"} p={2} borderRadius={"10px"}>
                    <Text>{item.content}</Text>
                  </Box>
                </Box>
              )
            )
          ) : (
            <Text>No hay historial disponible</Text>
          )}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"sticky"}
            bottom={0}
            bg={"white"}
          >
            <Box borderRadius={"20px"}  bg={"#EAEAEA"} w={"100%"} m={2}>
              <Input
                type="text"
                placeholder="Preguntale a Pocki"
                border="none"
                w={"100%"}
                m={2}
              />
            </Box>
            <Button
              mr={1}
              bg={"#632AE7"}
              borderRadius={"50%"}
              h={50}
              w={50}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IoSend size={30} color={"white"} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
