import { useLoaderData } from '@tanstack/react-router';
import ProjectList from '../components/ProjectList';

const ProjectsPage = () => {
  const projects = useLoaderData({ from: '/_auth/projects' });

  return (
    <div>
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjectsPage;
