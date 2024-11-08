import { Request, Response } from "express";
import { editTaskStatusService } from "../services/edit-status-task-service";

export const editStatusTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await editTaskStatusService(Number(id));

  try {
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: result });
  }

  // Si el resultado indica algún error
};
