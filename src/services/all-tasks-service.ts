import { pool } from "../config/conectionPostgreSQL";
import { ITodo } from "../interfaces/all.interfaces";

export const allTasksService = async (): Promise<ITodo[]> => {
  // Consulta SQL para obtener todas las tareas
  const query = "SELECT id, title, type, description, status FROM tasks";

  try {
    // Ejecutamos la consulta
    const result = await pool.query(query);

    // Retornamos las filas obtenidas de la consulta
    return result.rows;
  } catch (err) {
    console.error("Error al obtener tareas:", err);
    throw new Error("No se pudieron obtener las tareas");
  }
};
