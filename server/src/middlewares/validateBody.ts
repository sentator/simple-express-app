import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import ApiError from '../exceptions/apiError';

const validateBody =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((error) => {
          return {
            [error.path.join('.')]: error.message,
          };
        });

        throw ApiError.BadRequest('Validation error', errors);
      }

      throw ApiError.BadRequest('Unexpected error');
    }
  };

export default validateBody;
