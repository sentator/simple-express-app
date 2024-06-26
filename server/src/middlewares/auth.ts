import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/apiError';
import { tokenService } from '../services';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
