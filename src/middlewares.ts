import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

export const checkValidId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validIdRegex = /^[0-9]*$/gi;
  const isValidId = validIdRegex.test(req.params.id);

  if (!isValidId) {
    return res.status(404).json({
      message: 'Incorrect id',
    });
  }

  next();
};
