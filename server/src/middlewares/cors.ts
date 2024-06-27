import { Request, Response, NextFunction } from 'express';

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

export default cors;
