import { Router } from "express";
import { deleteTaskController } from "../controllers/delete-task-controller";
import { createTask } from "../controllers/create-task-controller";
import { editTask } from "../controllers/edit-status-task-controller";
import { allTasks } from "../controllers/all-tasks-controller";

const router: Router = Router();

router.get("/all-tasks", allTasks);

router.post("/create-task", createTask);

router.put("/edit-task/:id", editTask);

router.delete("/delete-task/:id", deleteTaskController);

export default router;
