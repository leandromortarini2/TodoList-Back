import { Request, Response } from "express";
import { ITodoData } from "../interfaces/all.interfaces";
import { createTaskService } from "../services/create-task-service";
export const createTask = async (req: Request, res: Response) => {
  const taskData: ITodoData = req.body;

  const newTask = await createTaskService(taskData);
  res.status(201).json(newTask);
};
