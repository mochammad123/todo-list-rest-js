import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().min(5).max(500).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
