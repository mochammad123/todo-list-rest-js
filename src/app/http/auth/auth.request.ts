import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(50),
});

export const loginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(50),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
