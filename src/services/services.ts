import { editTask } from "./../controllers/controllers";
import { ITodo, ITodoData } from "../interfaces/all.interfaces";

const id = 0;

export const tasksArray: ITodo[] = [
  {
    id: 1,
    title: "Create Contact",
    type: "view",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vitae pariatur cupiditate, aperiam aut in minus mollitia impedit modi, commodi corporis. Tempore possimus culpa explicabo a animi? Ad, aspernatur obcaecati.",
    status: "in-progress",
  },
  {
    id: 2,
    type: "component",
    title: "Create Table",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vitae pariatur cupiditate, aperiam aut in minus mollitia impedit modi, commodi corporis. Tempore possimus culpa explicabo a animi? Ad, aspernatur obcaecati.",
    status: "pending",
  },

  {
    id: 3,
    type: "service",
    title: "Create Servicio Users",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vitae pariatur cupiditate, aperiam aut in minus mollitia impedit modi, commodi corporis. Tempore possimus culpa explicabo a animi? Ad, aspernatur obcaecati.",
    status: "in-progress",
  },
];

export const allTasksService = async (): Promise<ITodo[]> => {
  return tasksArray;
};

export const createTaskService = async (
  taskData: ITodoData
): Promise<ITodo> => {
  const maxId =
    tasksArray.length > 0 ? Math.max(...tasksArray.map((task) => task.id)) : 0; // Obtener el máximo ID actual
  const newTask: ITodo = {
    id: maxId + 1, // Asignar un nuevo ID
    title: taskData.title,
    type: taskData.type,
    description: taskData.description,
    status: "pending",
  };
  tasksArray.push(newTask); // Añadir la nueva tarea al array
  return newTask; // Devolver la nueva tarea
};
export const editTaskService = async (id: number): Promise<string> => {
  const task = tasksArray.find((e) => id === e.id);

  if (task?.status === "pending") {
    task.status = "in-progress";
  } else if (task?.status === "in-progress") {
    task.status = "finished";
  } else {
    return "Invalid status transition"; // Manejar estados no válidos
  }

  return `Task ${id} updated successfully to ${task.status}`;
};
