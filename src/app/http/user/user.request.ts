import { z, infer as zInfer } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(30),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  username: z.string().min(3).max(30).optional(),
});

export type CreateUserInput = zInfer<typeof createUserSchema>;
export type UpdateUserInput = zInfer<typeof updateUserSchema>;
