import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "../../../libs/middlewares/auth.middleware";

const router: Router = Router();

router.use(authMiddleware);
router.get("/me/:id", userController.getMe);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
