import { FC } from 'react';
import { Project } from '../types/projects';
import ProjectItem from './ProjectItem';

type Props = {
  projects: Project[];
};

const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
      }}
    >
      {projects.map((project) => (
        <ProjectItem key={project.project_id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
