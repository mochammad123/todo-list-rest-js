import { Router } from "express";
import taskController from "./task.controller";

const router: Router = Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id/:userId", taskController.deleteTask);

export default router;
