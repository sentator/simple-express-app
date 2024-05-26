import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Executor } from '../entity';

class ExecutorController {
  async getExecutors(req: Request, res: Response) {
    try {
      const result = await AppDataSource.manager.find(Executor);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createExecutor(req: Request, res: Response) {
    try {
      const body: Omit<Executor, 'executor_id'> = req.body;

      const executor = new Executor();
      executor.first_name = body.first_name;
      executor.last_name = body.last_name;
      executor.email = body.email;

      const result = await AppDataSource.manager.save(executor);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ExecutorController();
