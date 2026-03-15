import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JWTPayload {
  userId: number;
  username: string;
}

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET as Secret,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    } as SignOptions,
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
};
