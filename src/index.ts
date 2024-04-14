import express from 'express';
import data from '../assets/data.json';
import { UserRequestBody } from './types';
import { checkValidId, cors } from './middlewares';
import { isValidAge, isValidName } from './utils';

const app = express();

app.use(express.json());
app.use(cors);

const PORT = 5000;
const users = [...data];

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', checkValidId, (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: 'User with the requested id does not exist',
    });
  }

  res.status(200).json(user);
});

app.post('/users', (req, res) => {
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
});

app.delete('/users/:id', checkValidId, (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User with the requested id does not exist',
    });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ id });
});

app.put('/users/:id', checkValidId, (req, res) => {
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
});

app.patch('/users/:id', checkValidId, (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
