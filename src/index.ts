import express from 'express';

import usersRouter from './routes/users.routes';
import { cors } from './middlewares';

const app = express();

app.use(express.json());
app.use(cors);

app.use('/users', usersRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
