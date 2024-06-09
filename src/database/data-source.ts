import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Project, Executor, Architect } from '../entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  //   host: process.env.POSTGRES_HOST,
  host: 'localhost', // TODO: it's for testing purpose only. Don't forget to remove it
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  // entities: [__dirname + '/entity/*.js'],
  entities: [Project, Executor, Architect],
  subscribers: [],
  migrations: ['./src/database/migrations/*.ts'],
});
