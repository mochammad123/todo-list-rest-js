import { query } from "../../../libs/config/database";

export default class UserRepository {
  async findById(id: number): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username FROM users WHERE id = $1`,
      [id],
    );

    return result.rows[0] || null;
  }

  async findByUsername(username: string): Promise<IUser.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username FROM users WHERE username = $1`,
      [username],
    );

    return result.rows[0] || null;
  }

  async create(user: IUser.CreateUser): Promise<IUser.ResponseUser> {
    const result = await query(
      `INSERT INTO users(name, username) 
      VALUES ($1, $2) 
      RETURNING id, name, username`,
      [user.name, user.username],
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
            username = COALESCE($2, username)
            WHERE id = $3`,
      [user.name, user.username, id],
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}
