import bcrypt from 'bcrypt';

import { AppDataSource } from '../database/data-source';
import { User } from '../entity';
import { tokenService } from './';
import ApiError from '../exceptions/apiError';

class UserService {
  async registration(data: Omit<User, 'user_id'>) {
    const { email, password } = data;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      throw ApiError.BadRequest('The user already exists');
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = userRepository.create({ ...data, password: hashPassword });
    await userRepository.save(user);

    return this.authenticateUser(user);
  }

  async login(email: User['email'], password: User['password']) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw ApiError.BadRequest('User with such email does not exist');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Invalid credentials');
    }

    return this.authenticateUser(user);
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDatabase) {
      throw ApiError.UnauthorizedError();
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ user_id: userData.user_id });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    return this.authenticateUser(user);
  }

  async authenticateUser(user: User) {
    const userDto = { user_id: user.user_id, email: user.email };
    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto.user_id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: userDto,
    };
  }
}

export default new UserService();
