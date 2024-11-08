import { Request, Response } from "express";
import { taskID } from "./../services/task-id";

export const taskIDController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await taskID(Number(id));
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
