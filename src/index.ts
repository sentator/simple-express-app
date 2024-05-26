import express from 'express';
import dotenv from 'dotenv';

import { executor, project, architect } from './routes';
import { cors } from './middlewares';
import { AppDataSource } from './database/data-source';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors);

app.use('/projects', project);
app.use('/executors', executor);
app.use('/architects', architect);

const PORT = process.env.PORT ?? 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('initialized DataSource');
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
