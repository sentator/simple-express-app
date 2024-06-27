import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/apiError';

export default function (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //eslint-disable-next-line
  console.log(error);

  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  //   handle unexpected errors
  return res.status(500).json({ message: 'Unexpected error' });
}
