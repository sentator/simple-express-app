import { Request, Response } from 'express';
import { Executor } from '../entity';
import { executorService } from '../services';

class ExecutorController {
  async getExecutors(req: Request, res: Response) {
    try {
      const result = await executorService.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createExecutor(req: Request, res: Response) {
    try {
      const body: Omit<Executor, 'executor_id'> = req.body;

      const result = await executorService.create(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ExecutorController();
