import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/apiError';
import { logger } from '../services';

export default function (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ApiError) {
    logger.error(error.message);
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  //   handle unexpected errors
  return res.status(500).json({ message: 'Unexpected error' });
}
