import { Request, Response } from 'express';
import { Architect } from '../entity';
import { architectService } from '../services';

class ArchitectController {
  async getArchitects(req: Request, res: Response) {
    try {
      const result = await architectService.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createArchitect(req: Request, res: Response) {
    try {
      const body: Omit<Architect, 'architector_id'> = req.body;

      const result = await architectService.create(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ArchitectController();
