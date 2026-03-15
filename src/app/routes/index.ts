import { Router } from "express";
import userRoutes from "../http/user/user.routes";

const router: Router = Router();

router.use("/users", userRoutes);

export default router;
