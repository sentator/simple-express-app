import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { Token, User } from '../entity';
import ApiError from '../exceptions/apiError';
import { UserDto } from '../types';
import { getUserDtoFromTokenPayload } from '../utils';

class TokenService {
  generateTokens(payload: Pick<User, 'user_id' | 'email'>) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET_KEY ?? '',
      {
        expiresIn: '15m',
      },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET_KEY ?? '',
      {
        expiresIn: '30d',
      },
    );

    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenRepository = AppDataSource.getRepository(Token);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ user_id: userId });

    if (!user) {
      throw ApiError.BadRequest('User does not exist');
    }

    const tokenData = await tokenRepository.findOneBy({ user });

    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return await tokenRepository.save(tokenData);
    }

    const token = tokenRepository.create({
      user,
      refresh_token: refreshToken,
    });

    return await tokenRepository.save(token);
  }

  async removeToken(refreshToken: string) {
    const tokenRepository = AppDataSource.getRepository(Token);

    return await tokenRepository.delete({
      refresh_token: refreshToken,
    });
  }

  validateAccessToken(token: string): UserDto | null {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET_KEY ?? '',
      );

      return getUserDtoFromTokenPayload(userData);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string): UserDto | null {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET_KEY ?? '',
      );

      return getUserDtoFromTokenPayload(userData);
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenRepository = AppDataSource.getRepository(Token);

    return await tokenRepository.findOneBy({
      refresh_token: refreshToken,
    });
  }
}

export default new TokenService();
