import bcrypt from "bcryptjs";
import { query } from "../../../libs/config/database";

export default class AuthRepository {
  async findById(id: number): Promise<IAuth.ResponseUser | null> {
    const result = await query(
      `SELECT id, name, username, password
            FROM users
            WHERE id = $1 LIMIT 1`,
      [id],
    );

    return result.rows[0] || null;
  }

  async findByUsername(username: string): Promise<IAuth.ResponseUser | null> {
    const result = await query(
      `SELECT id, username, password
            FROM users
            WHERE username = $1 LIMIT 1`,
      [username],
    );

    return result.rows[0] || null;
  }

  async create(user: IAuth.RequestRegister): Promise<IAuth.ResponseUser> {
    const result = await query(
      `INSERT INTO users (name, username, password)
        VALUES($1, $2, $3)
        RETURNING id, name, username`,
      [user.name, user.username, user.password],
    );

    return result.rows[0];
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
