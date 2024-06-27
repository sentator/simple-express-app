import { RegistrationPayload, UserShort } from './user';

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    user_id: number;
    email: string;
  };
};

export type AuthContext = {
  user: UserShort | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  registration: (payload: RegistrationPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
};
