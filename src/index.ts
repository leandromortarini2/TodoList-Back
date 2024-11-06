import { PORT } from "./config/envs";
import server from "./server";
import { pool } from "./config/conectionPostgreSQL"; // Asegúrate de que la ruta sea la correcta

// Verificar conexión y manejar errores
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar con la base de datos", err.stack);
  } else {
    console.log("Conectado a la base de datos");
  }
  // Liberamos el cliente después de la verificación
  release();
});

server.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
