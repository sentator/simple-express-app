import { createFileRoute } from '@tanstack/react-router';
import ProjectService from '../services/ProjectService';
import ProjectsPage from '../pages/ProjectsPage';

export const Route = createFileRoute('/_auth/projects')({
  loader: ProjectService.getProjects,
  component: ProjectsPage,
});
