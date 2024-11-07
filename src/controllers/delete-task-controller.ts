import { Request, Response } from "express";
import { deleteTaskService } from "../services/delete-task";

export const deleteTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteTaskService(Number(id));
  res.status(200).json({ message: result });
};
