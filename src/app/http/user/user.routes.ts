import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();

router.get("/me/:id", userController.getMe);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
