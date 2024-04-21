import { Request, Response } from 'express';
import data from '../../assets/data.json';
import { UserRequestBody } from '../types';
import { isValidAge, isValidName } from '../utils';

const users = [...data];

class UsersController {
  getUsers(req: Request, res: Response) {
    res.status(200).json(users);
  }

  getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        message: 'User with the requested id does not exist',
      });
    }

    res.status(200).json(user);
  }

  createUser(req: Request, res: Response) {
    const body: UserRequestBody = req.body;
    const isValidBody = isValidName(body.name) && isValidAge(body.age);
    if (!isValidBody) {
      return res.status(404).json({
        message: 'Incorrect body was provided.',
      });
    }
    const userId = users.length + 1;
    users.push({ id: userId, name: body.name, age: body.age });
    res.status(200).json({ id: userId });
  }

  replaceUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body: UserRequestBody = req.body;
    const isValidBody = isValidName(body.name) && isValidAge(body.age);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User with the requested id does not exist',
      });
    }

    if (!isValidBody) {
      return res.status(404).json({
        message: 'Incorrect body was provided.',
      });
    }

    const updatedUser = { id, name: body.name, age: body.age };
    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
  }

  updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body: Partial<UserRequestBody> = req.body;
    const isEmptyBody = !body.name && !body.age;
    if (isEmptyBody) {
      return res.status(404).json({
        message: "Body can't be empty",
      });
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User with the requested id does not exist',
      });
    }
    const updatedUser = {
      id,
      name: isValidName(body.name) ? body.name : users[userIndex].name,
      age: isValidAge(body.age) ? body.age : users[userIndex].age,
    };
    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
  }

  deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User with the requested id does not exist',
      });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ id });
  }
}

export default new UsersController();
