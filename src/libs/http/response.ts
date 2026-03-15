import { Response } from "express";

export function response<T>(
  res: Response,
  status: number = 200,
  message: string,
  data?: T,
): Response {
  return res.status(status).json({
    message,
    result: data || null,
  });
}
