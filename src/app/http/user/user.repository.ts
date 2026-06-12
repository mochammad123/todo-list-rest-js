import { query } from "../../../libs/config/database";

export default class UserRepository {
  async getAll(): Promise<IUser.ResponseUser[]> {
    const result = await query(
      `SELECT id, name, username, email FROM users ORDER BY id ASC`,
    );

    return result.rows;
  }

  async findById(id: number): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username, email FROM users WHERE id = $1`,
      [id],
    );

    return result.rows[0] || null;
  }

  async findByUsername(username: string): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username, email FROM users WHERE username = $1`,
      [username],
    );

    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username, email FROM users WHERE email = $1`,
      [email],
    );

    return result.rows[0] || null;
  }

  async create(user: IUser.CreateUser): Promise<IUser.ResponseUser> {
    const result = await query(
      `INSERT INTO users(name, username, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, username, email`,
      [user.name, user.username, user.email, user.password],
    );

    return result.rows[0];
  }

  async update(
    id: number,
    user: IUser.UpdateUser,
  ): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `UPDATE users
        SET name = COALESCE($1, name),
            username = COALESCE($2, username),
            email = COALESCE($3, email),
            password = COALESCE($4, password)
            WHERE id = $5
        RETURNING id, name, username, email`,
      [user.name, user.username, user.email, user.password, id],
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}
