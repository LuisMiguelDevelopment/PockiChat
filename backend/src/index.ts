import { app } from "./app.js";
import { PORT } from "./config/config.js";

/**
 * Función que inicia el servidor en el puerto espeficado
 * @param {number} PORT
 * @returns {void} console.log(PORT)
 *
 */

app.listen(PORT, (): void => {
  console.log(`Server running on PORT ${PORT}`);
});
