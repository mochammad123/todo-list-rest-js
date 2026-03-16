import { NextFunction, Request, Response } from "express";
import TaskRepository from "./task.repository";
import { response } from "../../../libs/http/response";
import { createTaskSchema, updateTaskSchema } from "./task.request";
import UserRepository from "../user/user.repository";

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repository = new TaskRepository();
    const tasks = await repository.getAll();

    return response(res, 200, "Berhasil mendapatkan data task", tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.params;
    const data = createTaskSchema.parse(req.body);

    const repoUser = new UserRepository();
    const repoTask = new TaskRepository();

    const user = await repoUser.findById(Number(userId));
    if (!user) return response(res, 404, "User tidak ditemukan");

    const task = await repoTask.create(Number(userId), data);
    if (!task) return response(res, 500, "Gagal membuat task");

    return response(res, 201, "Berhasil membuat task", task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.params;
    const data = updateTaskSchema.parse(req.body);

    const repoUser = new UserRepository();
    const repoTask = new TaskRepository();

    const user = await repoUser.findById(Number(userId));
    if (!user) return response(res, 404, "User tidak ditemukan");

    const task = await repoTask.findById(data.id);
    if (!task) return response(res, 404, "Task tidak ditemukan");

    const updatedTask = await repoTask.update(Number(userId), data);
    if (!updatedTask) return response(res, 500, "Gagal memperbarui task");

    return response(res, 200, "Berhasil memperbarui task", updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, userId } = req.params;

    const repoUser = new UserRepository();
    const repoTask = new TaskRepository();

    const user = await repoUser.findById(Number(userId));
    if (!user) return response(res, 404, "User tidak ditemukan");

    const task = await repoTask.findById(Number(id));
    if (!task) return response(res, 404, "Task tidak ditemukan");

    await repoTask.delete(Number(id), Number(userId));

    return response(res, 200, "Berhasil menghapus task");
  } catch (error) {
    next(error);
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
