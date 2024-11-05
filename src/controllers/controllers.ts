import { ITodoData } from "./../interfaces/all.interfaces";
import { Request, Response } from "express";
import {
  allTasksService,
  createTaskService,
  editTaskService,
} from "../services/services";

export const allTasks = async (req: Request, res: Response) => {
  const result = await allTasksService();
  res.status(200);
  res.json(result); // Asegura que se envía como JSON
};

// Controlador para crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
  const taskData: ITodoData = req.body;

  const newTask = await createTaskService(taskData);
  res.status(201).json(newTask);
};

export const editTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await editTaskService(Number(id));

  if (result.includes("updated successfully")) {
    res.status(200).json({ message: result });
  } else {
    // Si el resultado indica algún error
    res.status(400).json({ error: result });
  }
};
