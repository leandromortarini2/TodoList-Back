import { Request, Response } from "express";
import { editTaskSerice } from "../services/edit-tast-service";

export const editTaskController = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = editTaskSerice(Number(id), req.body);

  try {
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ error: result });
  }
};
