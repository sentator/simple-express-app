import defaultApi from '../api';
import { AuthResponse } from '../types/auth';
import { RegistrationPayload } from '../types/user';

export default class AuthService {
  static async login(email: string, password: string) {
    const response = await defaultApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  static async registration(data: RegistrationPayload) {
    const response = await defaultApi.post<AuthResponse>(
      '/auth/registration',
      data,
    );
    return response.data;
  }

  static async logout() {
    return defaultApi.post<AuthResponse>('/auth/logout');
  }

  static async refreshToken() {
    const response = await defaultApi.get<AuthResponse>('/auth/refresh');

    return response.data;
  }
}
