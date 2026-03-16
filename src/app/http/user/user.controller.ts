import { NextFunction, Request, Response } from "express";
import UserRepository from "./user.repository";
import { response } from "../../../libs/http/response";
import { createUserSchema, updateUserSchema } from "./user.request";

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const repository = new UserRepository();
    // for using JWT authentication, we can get the user id from req.user which is set by authMiddleware
    // const user = repository.findById(req.user!.userId);

    const user = await repository.findById(Number(id));

    if (!user) return response(res, 404, "User tidak ditemukan");

    return response(res, 200, "Berhasil mendapatkan data user", user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createUserSchema.parse(req.body);
    const repository = new UserRepository();

    const existingUser = await repository.findByUsername(data.username);
    if (existingUser) return response(res, 400, "Username sudah digunakan");

    const user = await repository.create(data);
    if (!user) return response(res, 500, "Gagal membuat user");

    return response(res, 201, "Berhasil membuat user", user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = updateUserSchema.parse(req.body);
    const repository = new UserRepository();

    // for using JWT authentication, we can get the user id from req.user which is set by authMiddleware
    // const existingUser = repository.findById(req.user!.userId);

    const existingUser = await repository.findById(Number(id));
    if (!existingUser) return response(res, 404, "User tidak ditemukan");

    const user = await repository.update(Number(id), data);
    if (!user) return response(res, 500, "Gagal memperbarui user");

    return response(res, 200, "Berhasil memperbarui user", user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const repository = new UserRepository();

    const existingUser = await repository.findById(Number(id));
    if (!existingUser) return response(res, 404, "User tidak ditemukan");

    await repository.delete(Number(id));

    return response(res, 200, "Berhasil menghapus user");
  } catch (error) {
    next(error);
  }
};

export default {
  getMe,
  createUser,
  updateUser,
  deleteUser,
};
