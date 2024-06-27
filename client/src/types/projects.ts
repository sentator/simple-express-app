export type Project = {
  project_id: number;
  name: string;
  status: ProjectStatus;
  executor_id: number;
  architectors_quantity: string;
};

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';
