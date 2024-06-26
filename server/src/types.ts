import { User } from './entity';

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';

export type CreateProjectBody = {
  name: string;
  status: ProjectStatus;
  executor_id: number | null;
  architects: number[] | null; //array if ids of architects
};

export type UpdateProjectBody = Partial<CreateProjectBody>;

export type UserDto = Pick<User, 'user_id' | 'email'>;
