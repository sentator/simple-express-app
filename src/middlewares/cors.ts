import { Request, Response, NextFunction } from 'express';

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

export default cors;
