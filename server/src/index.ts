import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { executor, project, architect, user, message } from './routes';
import { cors, errorMiddleware, authMiddleware } from './middlewares';
import { AppDataSource } from './database/data-source';
import { runSeeds } from './database/seeds';
import { logger } from './services';
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use('/projects', authMiddleware, project);
app.use('/executors', executor);
app.use('/architects', architect);
app.use('/auth', user);
app.use('/messages', message);

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 5000;

AppDataSource.initialize()
  .then(() => {
    logger.info('DataSource has been successfully initialized');
    runSeeds();
  })
  .catch((error) => {
    logger.error('DataSource has not been initialized');
  });

app.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
