import { AppDataSource } from '../database/data-source';
import { Executor } from '../entity';

class ExecutorService {
  async getAll() {
    return await AppDataSource.manager.find(Executor);
  }

  async create(data: Omit<Executor, 'executor_id'>) {
    const executorRepository = AppDataSource.getRepository(Executor);
    const executor = executorRepository.create(data);
    const result = await executorRepository.save(executor);

    return result;
  }
}

export default new ExecutorService();
