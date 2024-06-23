export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';

export type CreateProjectBody = {
  name: string;
  status: ProjectStatus;
  executor_id: number | null;
  architects: number[] | null; //array if ids of architects
};

export type UpdateProjectBody = Partial<CreateProjectBody>;
