import { Router } from "express";
import taskController from "./task.controller";
import { authMiddleware } from "../../../libs/middlewares/auth.middleware";

const router: Router = Router();

router.use(authMiddleware);
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
