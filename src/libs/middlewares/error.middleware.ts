import { NextFunction, Request, Response } from "express";
import z from "zod";
import { response } from "../http/response";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error :", err);

  if (err instanceof z.ZodError) {
    const details = err.issues.map((e: z.ZodIssue) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    response(res, 400, "Validation Error", details);
    return;
  }

  response(res, 500, "Internal Server Error");
};
