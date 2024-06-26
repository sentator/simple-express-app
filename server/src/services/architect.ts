import { AppDataSource } from '../database/data-source';
import { Architect } from '../entity';

class ArchitectService {
  async getAll() {
    return await AppDataSource.manager.find(Architect);
  }

  async create(data: Omit<Architect, 'architector_id'>) {
    const architectRepository = AppDataSource.getRepository(Architect);
    const architect = architectRepository.create(data);
    const result = await architectRepository.save(architect);

    return result;
  }
}

export default new ArchitectService();
