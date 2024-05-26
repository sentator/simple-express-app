export type Project = {
  project_id: number;
  name: string;
  status: ProjectStatus;
  executor_id: number | null;
  architectors_quantity: number;
};

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';

// export type Executor = {
//   executor_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
// };

// export type Architect = {
//   architector_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   license: string;
// };
