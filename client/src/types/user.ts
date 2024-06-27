export type UserShort = {
  user_id: number;
  email: string;
};

export type RegistrationPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
