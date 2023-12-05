import IUser from '@models/IUser';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUserRepository from './interfaces/IUserRepository';
import database from '@config/database';
import IUpdateUserDTO from './dtos/IUpdateUserDTO';
import { generateOrderByClauses } from '@common/utils/helpers';

export default class UserRepositoryImpl implements IUserRepository {
  async getAllUsers(paginationParams: IPaginationParams): Promise<IUser[]> {
    const client = await database.connect();
    const orderByClauses = generateOrderByClauses(paginationParams.orderBy);
    try {
      const result = await client.query(
        `SELECT * FROM users
        ${orderByClauses.length > 0 ? `ORDER BY ${orderByClauses.join(',')}` : ''}
        LIMIT $1 OFFSET $2`,
        [paginationParams.perPage, paginationParams.page * paginationParams.perPage],
      );

      if (result.rows.length > 0) {
        const users: IUser[] = [];
        result.rows.forEach(user => {
          users.push({
            userId: user.userId,
            username: user.username,
            mail: user.mail,
            password: user.password,
            name: user.name,
            title: user.title,
            about: user.about,
            birthday: user.birthday,
            lastName: user.last_name,
            creationDate: user.creation_date,
            updateDate: user.update_date,
          });
        });
        return users;
      } else {
        return null;
      }
    } finally {
      client.release();
    }
  }

  async getUserById(userId: number): Promise<IUser> {
    const client = await database.connect();
    try {
      const result = await client.query(
        `SELECT * FROM users 
        WHERE user_id = $1
        `,
        [userId],
      );

      if (result.rows[0]) {
        const user = result.rows[0];
        return {
          userId: user.user_id,
          name: user.name,
          lastName: user.last_name,
          username: user.username,
          password: user.password,
          mail: user.mail,
          title: user.title,
          about: user.about,
          birthday: user.birthday,
          creationDate: user.creationDate,
          updateDate: user.update_date,
        };
      } else {
        return null;
      }
    } finally {
      client.release();
    }
  }

  async createUser(user: ICreateUserDTO): Promise<void> {
    const client = await database.connect();
    try {
      await client.query(
        `INSERT INTO users (name, last_name, password, username, mail, title, about, birthday, creation_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)`,
        [
          user.name,
          user.lastName,
          user.password,
          user.username,
          user.mail,
          user.title,
          user.about,
          user.birthday,
          new Date(),
        ],
      );
    } finally {
      client.release();
    }
  }

  async updateUser(user: IUpdateUserDTO): Promise<void> {
    const client = await database.connect();
    try {
      await client.query(
        `UPDATE users SET 
          name = $1,
          last_name = $2,
          password = $3,
          username = $4,
          mail = $5,
          title = $6,
          about = $7,
          birthday = $8,
          update_date = $9
        WHERE id = $10
        `,
        [
          user.name,
          user.lastName,
          user.password,
          user.username,
          user.mail,
          user.title,
          user.about,
          user.birthday,
          new Date(),
          user.userId,
        ],
      );
    } finally {
      client.release();
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const client = await database.connect();
    try {
      await client.query(
        `DELETE FROM users 
        WHERE id = $1`,
        [userId],
      );
    } finally {
      client.release();
    }
  }

  async countUsers(): Promise<number> {
    const client = await database.connect();
    try {
      const result = await client.query(`SELECT COUNT(*) AS total_count FROM users`);
      return parseInt(result.rows[0].total_count);
    } finally {
      client.release();
    }
  }

  async existsByMail(email: string): Promise<boolean> {
    const client = await database.connect();
    try {
      const result = await client.query(
        `SELECT EXISTS(
          SELECT 1 FROM users 
          WHERE mail = $1
        )
        `,
        [email],
      );
      return result.rows[0].exists;
    } finally {
      client.release();
    }
  }

  async existsByUsername(username: string): Promise<boolean> {
    const client = await database.connect();
    try {
      const result = await client.query(
        `SELECT EXISTS(
          SELECT 1 FROM users 
          WHERE username = $1
        )
        `,
        [username],
      );
      return result.rows[0].exists;
    } finally {
      client.release();
    }
  }
}
