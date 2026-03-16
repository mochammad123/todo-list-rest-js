import { Router } from "express";
import userRoutes from "../http/user/user.routes";
import taskRoutes from "../http/task/task.routes";

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
