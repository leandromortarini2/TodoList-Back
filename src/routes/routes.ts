import { Router } from "express";
import { deleteTaskController } from "../controllers/delete-task-controller";
import { createTask } from "../controllers/create-task-controller";
import { allTasks } from "../controllers/all-tasks-controller";
import { taskIDController } from "../controllers/task-id-controller";
import { editStatusTask } from "../controllers/edit-status-task-controller";
import { editTaskController } from "../controllers/edit-task";

const router: Router = Router();

router.get("/all-tasks", allTasks);

router.get("/task/:id", taskIDController);

router.post("/create-task", createTask);

router.put("/edit-status-task/:id", editStatusTask);

router.put("/edit-task/:id", editTaskController);

router.delete("/delete-task/:id", deleteTaskController);

export default router;
