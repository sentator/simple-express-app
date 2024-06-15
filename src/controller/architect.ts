import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Architect } from '../entity';

class ArchitectController {
  async getArchitects(req: Request, res: Response) {
    try {
      const result = await AppDataSource.manager.find(Architect);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createArchitect(req: Request, res: Response) {
    try {
      const body: Omit<Architect, 'architector_id'> = req.body;
      const architectRepository = AppDataSource.getRepository(Architect);
      const architect = architectRepository.create(body);
      const result = await architectRepository.save(architect);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ArchitectController();
