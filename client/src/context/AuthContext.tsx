import { createContext, useState, FC, PropsWithChildren } from 'react';
import { RegistrationPayload, UserShort } from '../types/user';
import { AuthContext as AuthContextType } from '../types/auth';
import AuthService from '../services/AuthService';

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: async () => {},
  registration: async () => {},
  logout: async () => {},
  refreshAccessToken: async () => {},
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
    const response = await AuthService.registration(payload);

    setUser(response.user);
    setAccessToken(response.access_token);
    localStorage.setItem('accessToken', response.access_token);
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout failed');
    }
  };

  //   TODO: add mechanism of token refreshment
  const refreshAccessToken = async () => {
    try {
      const response = await AuthService.refreshToken();
      setUser(response.user);
      setAccessToken(response.access_token);
      localStorage.setItem('accessToken', response.access_token);
    } catch (error) {
      console.error('Token refreshment failed', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        registration,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
