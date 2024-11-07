import { pool } from "../config/conectionPostgreSQL";

export const editTaskStatusService = async (id: number): Promise<string> => {
  const query =
    "SELECT id, title, type, description, status FROM tasks WHERE id = $1"; // Consulta para obtener la tarea por ID

  try {
    // Obtenemos la tarea
    const result = await pool.query(query, [id]);

    // Si no se encuentra la tarea, devolvemos un mensaje
    if (result.rows.length === 0) {
      return `Task with id ${id} not found`;
    }

    const task = result.rows[0];

    // Cambiar el estado de la tarea según el valor actual
    let newStatus: string;
    if (task.status === "pending") {
      newStatus = "in-progress";
    } else if (task.status === "in-progress") {
      newStatus = "finished";
    } else if (task.status === "in-progress") {
      newStatus = "finished";
    } else if (task.status === "finished") {
      newStatus = "pending";
    } else {
      return "Invalid status transition"; // Si no se puede hacer la transición de estado
    }

    // Actualizamos el estado en la base de datos
    const updateQuery =
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *";
    const updateResult = await pool.query(updateQuery, [newStatus, id]);

    // Verificamos si la actualización fue exitosa
    if (updateResult.rows.length > 0) {
      return newStatus;
    } else {
      return "Failed to update task status";
    }
  } catch (err) {
    console.error("Error updating task status:", err);
    throw new Error("Error updating task status");
  }
};
