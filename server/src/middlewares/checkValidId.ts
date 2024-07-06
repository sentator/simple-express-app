import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/apiError';

const checkValidId = (req: Request, res: Response, next: NextFunction) => {
  const validIdRegex = /^[0-9]*$/gi;
  const isValidId = validIdRegex.test(req.params.id);

  if (!isValidId) {
    throw ApiError.BadRequest('Provided id is invalid');
  }

  next();
};

export default checkValidId;
