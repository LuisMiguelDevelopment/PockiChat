import { app } from "./app.js";
const PORT = 3000;
/**
 * Función que inicia el servidor en el puerto espeficado
 * @param {number} PORT
 * @returns {void} console.log(PORT)
 *
 */
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
