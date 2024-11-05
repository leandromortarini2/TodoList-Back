import { Router } from "express";
import { allTasks, createTask, editTask } from "../controllers/controllers";

const router: Router = Router();

router.get("/all-tasks", allTasks);

router.post("/create-task", createTask);

router.get("/edit-task/:id", editTask);

export default router;
