export type User = {
  id: number;
  name: string;
  age: number;
};

export type UserRequestBody = {
  name: string;
  age: number;
};

export type Project = {
  project_id: number;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  executor_id: number | null;
  architectors_quantity: number;
};
