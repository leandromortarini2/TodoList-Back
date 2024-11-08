import { pool } from "../config/conectionPostgreSQL";
import { ITodo } from "../interfaces/all.interfaces";

export const editTaskSerice = async (
  id: number,
  updatedData: ITodo
): Promise<ITodo> => {
  const query = `UPDATE tasks SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *`;

  try {
    const result = await pool.query(query, [
      updatedData.title,
      updatedData.description,
      updatedData.type,
      id,
    ]);

    if (!result.rows.length) {
      throw new Error("Task not found");
    }

    return result.rows[0]; // Devuelve la tarea actualizada
  } catch (err) {
    console.error("Error editing task:", err);
    throw new Error("Error editing task");
  }
};
