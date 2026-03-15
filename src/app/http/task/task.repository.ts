import { query } from "../../../libs/config/database";

export default class TaskRepository {
  async findById(id: number): Promise<ITask.ResponseTask | null> {
    const result = await query(
      `SELECT id, title, description, user_id FROM tasks WHERE id = $1`,
      [id],
    );

    return result.rows[0] || null;
  }

  async findByUserId(userId: number): Promise<ITask.ResponseTask[]> {
    const result = await query(
      `SELECT t.id, t.title, t.description, u.name, u.username
        FROM tasks t
        JOIN users u ON t.user_id = u.id
        WHERE u.id = $1`,
      [userId],
    );

    return result.rows;
  }

  async getAll(): Promise<ITask.ResponseTask[]> {
    const result = await query(
      `SELECT t.id, t.title, t.description, t.user_id, u.name, u.username
        FROM tasks t
        LEFT JOIN users u ON t.user_id = u.id`,
    );
    return result.rows;
  }

  async create(
    userId: number,
    task: ITask.CreateTask,
  ): Promise<ITask.ResponseTask> {
    const result = await query(
      `INSERT INTO tasks(title, description, user_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, description, user_id`,
      [task.title, task.description, userId],
    );
    return result.rows[0];
  }

  async update(
    id: number,
    userId: number,
    task: ITask.UpdateTask,
  ): Promise<ITask.ResponseTask | null> {
    const result = await query(
      `UPDATE tasks
        SET title = COALESCE($1, title),
            description = COALESCE($2, description)
        WHERE id = $3 AND user_id = $4
        RETURNING id, title, description, user_id`,
      [task.title, task.description, id, userId],
    );
    return result.rows[0] || null;
  }

  async delete(id: number, userId: number): Promise<void> {
    await query(`DELETE FROM tasks WHERE id = $1 AND user_id = $2`, [
      id,
      userId,
    ]);
  }
}
