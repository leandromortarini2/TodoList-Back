import { pool } from "../config/conectionPostgreSQL";
import { ITodo } from "../interfaces/all.interfaces";

export const taskID = async (id: number): Promise<ITodo> => {
  const query = "SELECT * FROM tasks WHERE id = $1";
  const result = await pool.query(query, [id]);

  if (!result.rows.length) {
    throw new Error("Task not found");
  }

  return result.rows[0];
};
