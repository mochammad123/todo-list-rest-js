import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.request";
import AuthRepository from "./auth.repository";
import { response } from "../../../libs/http/response";
import { generateToken } from "../../../libs/helpers/jwt.helper";
import bcrypt from "bcryptjs";
import { publishToQueue, QUEUES } from "../../../libs/helpers/queue.helper";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const repository = new AuthRepository();

    const existingUser = await repository.findByUsername(data.username);
    if (existingUser)
      return response(
        res,
        400,
        "Username sudah digunakan, silahkan gunakan username lain",
      );

    const existingEmail = await repository.findByEmail(data.email);
    if (existingEmail)
      return response(
        res,
        400,
        "Email sudah digunakan, silahkan gunakan email lain",
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await repository.create({ ...data, password: hashedPassword });
    if (!user)
      return response(res, 500, "Gagal membuat user, silahkan coba lagi");

    await publishToQueue(QUEUES.USER_REGISTERED, {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    });

    return response(res, 201, "Berhasil membuat user", user);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const repository = new AuthRepository();

    const user = await repository.findByUsername(data.username);
    if (!user) return response(res, 400, "Username atau password salah");

    const isPasswordCorrect = await repository.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordCorrect)
      return response(res, 400, "Username atau password salah");

    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    return response(res, 200, "Berhasil login", {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
