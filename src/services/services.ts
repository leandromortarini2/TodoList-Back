import { editTask } from "./../controllers/controllers";
import { ITodo, ITodoData } from "../interfaces/all.interfaces";
import { pool } from "../config/conectionPostgreSQL";

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

// CREAR UNA TAREA
// CREAR UNA TAREA
// CREAR UNA TAREA

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

// OBTENER UNA TAREA
// OBTENER UNA TAREA
// OBTENER UNA TAREA

export const getTaskByIdService = async (id: number): Promise<any> => {
  const query = "SELECT * FROM tasks WHERE id = $1"; // Consulta para obtener la tarea por ID

  try {
    // Ejecutamos la consulta
    const result = await pool.query(query, [id]);

    // Si no se encuentra la tarea, se devuelve un mensaje
    if (result.rows.length === 0) {
      return { message: `Task with id ${id} not found` };
    }

    // Devolvemos la tarea encontrada
    return result.rows[0];
  } catch (err) {
    console.error("Error getting task:", err);
    throw new Error("Error getting task");
  }
};

// EDITAR UNA TAREA
// EDITAR UNA TAREA
// EDITAR UNA TAREA
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
