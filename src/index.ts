import express from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/users.routes';
import projectsRouter from './routes/projects.routes';
import { cors } from './middlewares';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors);

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
