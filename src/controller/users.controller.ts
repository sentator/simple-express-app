import { Request, Response } from 'express';
import { User, UserRequestBody } from '../types';
import { isValidAge, isValidName } from '../utils';
import db from '../database/index';
class UsersController {
  async getUsers(req: Request, res: Response) {
    try {
      const result = await db.query<User[]>('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const result = await db.query<User>('SELECT * FROM users WHERE id = $1', [
        id,
      ]);

      if (!result.rows[0]) {
        return res.status(404).json({
          message: 'User with the requested id does not exist',
        });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createUser(req: Request, res: Response) {
    const body: UserRequestBody = req.body;
    const isValidBody = isValidName(body.name) && isValidAge(body.age);
    if (!isValidBody) {
      return res.status(404).json({
        message: 'Incorrect body was provided.',
      });
    }

    try {
      const result = await db.query<User>(
        'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
        [body.name, body.age],
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async replaceUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body: UserRequestBody = req.body;
    const isValidBody = isValidName(body.name) && isValidAge(body.age);

    if (!isValidBody) {
      return res.status(404).json({
        message: 'Incorrect body was provided.',
      });
    }

    try {
      const result = await db.query<User>(
        'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *',
        [body.name, body.age, id],
      );

      if (!result.rows[0]) {
        return res.status(404).json({
          message: 'User with the requested id does not exist',
        });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body: Partial<UserRequestBody> = req.body;
    const isEmptyBody = !body.name && !body.age;
    if (isEmptyBody) {
      return res.status(404).json({
        message: "Body can't be empty",
      });
    }

    try {
      const userRequest = await db.query<User>(
        'SELECT * FROM users WHERE id = $1',
        [id],
      );
      const savedUser = userRequest.rows[0];

      if (!savedUser) {
        return res.status(404).json({
          message: 'User with the requested id does not exist',
        });
      }

      const updatedUser = {
        name: isValidName(body.name) ? body.name : savedUser.name,
        age: isValidAge(body.age) ? body.age : savedUser.age,
      };

      const result = await db.query<User>(
        'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *',
        [updatedUser.name, updatedUser.age, id],
      );

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const result = await db.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id],
      );

      if (!result.rows[0]) {
        return res.status(404).json({
          message: 'User with the requested id does not exist',
        });
      }

      res.status(200).json({ id });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UsersController();
