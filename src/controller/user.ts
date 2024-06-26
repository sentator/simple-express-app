import { NextFunction, Request, Response } from 'express';
import { User } from '../entity';
import { userService } from '../services';
import { setRefreshTokenCookie } from '../utils';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Omit<User, 'user_id'> = req.body;

      const userData = await userService.registration(data);
      setRefreshTokenCookie(userData.refresh_token, res);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: Pick<User, 'email' | 'password'> = req.body;

      const userData = await userService.login(email, password);
      setRefreshTokenCookie(userData.refresh_token, res);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken ?? '';

      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Successful logout' });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken: string = req.cookies.refreshToken ?? '';

      const userData = await userService.refresh(refreshToken);
      setRefreshTokenCookie(userData.refresh_token, res);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
