import { pool } from "../config/conectionPostgreSQL";
import { ITodo, ITodoData } from "../interfaces/all.interfaces";

export const createTaskService = async (
  taskData: ITodoData
): Promise<ITodo> => {
  // SQL query para insertar la nueva tarea en la base de datos
  const query = `
    INSERT INTO tasks (title, type, description, status)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, type, description, status;
  `;

  // Ejecutar la consulta
  try {
    const result = await pool.query(query, [
      taskData.title,
      taskData.type,
      taskData.description,
      "pending", // Valor predeterminado para el status
    ]);

    // Devolver la tarea creada
    const newTask = result.rows[0]; // El primer registro de los resultados
    return newTask;
  } catch (err) {
    console.error("Error al crear tarea:", err);
    throw new Error("No se pudo crear la tarea");
  }
};
