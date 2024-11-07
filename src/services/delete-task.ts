import { pool } from "../config/conectionPostgreSQL";

export const deleteTaskService = async (id: number): Promise<string> => {
  const query = "DELETE FROM tasks WHERE id = $1";
  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return `Task with id ${id} not found`;
    }
    return `Task with id ${id} deleted`;
  } catch (err) {
    console.error("Error deleting task:", err);
    throw new Error("Error deleting task");
  }
};
