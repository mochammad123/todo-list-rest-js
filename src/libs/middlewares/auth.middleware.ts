import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt.helper";
import { response } from "../http/response";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response(res, 401, "Unauthorized");
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return response(res, 401, "Invalid Token");
  }
};
