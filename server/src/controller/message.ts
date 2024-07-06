import { NextFunction, Request, Response } from 'express';
import { messageService } from '../services';
import { CreateMessageBody } from '../types';

class MessageController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await messageService.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data: CreateMessageBody = req.body;

    try {
      const result = await messageService.create(data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const message_id = Number(req.params.id);
    const data: CreateMessageBody = req.body;

    try {
      const result = await messageService.update({ message_id, ...data });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const message_id = Number(req.params.id);

    try {
      const result = await messageService.delete(message_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new MessageController();
