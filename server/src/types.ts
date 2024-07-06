import { Message, User } from './entity';

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';

export type CreateProjectBody = {
  name: string;
  status: ProjectStatus;
  executor_id: number | null;
  architects: number[] | null; //array if ids of architects
};

export type UpdateProjectBody = Partial<CreateProjectBody>;

export type UserDto = Pick<User, 'user_id' | 'email'>;

export type CreateMessageBody = {
  value: string;
  sender: number;
  receiver: number;
};

export type UpdateMessageBody = CreateMessageBody & {
  message_id: number;
};

export type MessageDto = Omit<Message, 'sender' | 'receiver'> & {
  sender_id: number;
  receiver_id: number;
};
