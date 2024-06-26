import express from 'express';
import dotenv from 'dotenv';

import { executor, project, architect } from './routes';
import { cors } from './middlewares';
import { AppDataSource } from './database/data-source';
import { seedProjects } from './database/seeds';
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
    // eslint-disable-next-line
    console.log('initialized DataSource');
    seedProjects();
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.log(error);
  });

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on ${PORT}.`);
});
