export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    user_id: number;
    email: string;
  };
};
