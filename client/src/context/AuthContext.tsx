import {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from 'react';
import axios from 'axios';
import { AuthResponse } from '../types/auth';
import { RegistrationPayload, UserShort } from '../types/user';
import { AuthContext as AuthContextType } from '../types/auth';
import AuthService from '../services/AuthService';

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: () => {},
  registration: () => {},
  refreshAccessToken: () => {},
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserShort | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);

      setUser(response.user);
      setAccessToken(response.access_token);
      localStorage.setItem('accessToken', response.access_token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const registration = async (payload: RegistrationPayload) => {
    try {
      const response = await AuthService.registration(payload);

      setUser(response.user);
      setAccessToken(response.access_token);
      localStorage.setItem('accessToken', response.access_token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  //   TODO: add mechanism of token refreshment
  const refreshAccessToken = async () => {
    try {
      const response = await axios.get<AuthResponse>(
        'http://localhost:5000/auth/refresh',
        { withCredentials: true },
      );
      setAccessToken(response.data.access_token);
      localStorage.setItem('accessToken', response.data.access_token);
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshAccessToken();
      },
      14 * 60 * 1000,
    ); // Refresh access token every 14 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, registration, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
