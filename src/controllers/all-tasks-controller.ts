import { Request, Response } from "express";
import { allTasksService } from "../services/all-tasks-service";

export const allTasks = async (req: Request, res: Response) => {
  const result = await allTasksService();
  res.status(200);
  res.json(result);
};
