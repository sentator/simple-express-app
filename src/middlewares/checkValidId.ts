import { Request, Response, NextFunction } from 'express';

const checkValidId = (req: Request, res: Response, next: NextFunction) => {
  const validIdRegex = /^[0-9]*$/gi;
  const isValidId = validIdRegex.test(req.params.id);

  if (!isValidId) {
    return res.status(404).json({
      message: 'Incorrect id',
    });
  }

  next();
};

export default checkValidId;
