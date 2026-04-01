import { Router } from "express";
import userRoutes from "../http/user/user.routes";
import taskRoutes from "../http/task/task.routes";
import authRoutes from "../http/auth/auth.routes";

const router: Router = Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/auth", authRoutes);

export default router;
