import { FC } from 'react';
import { Project } from '../types/projects';

const ProjectItem: FC<Project> = ({
  project_id,
  status,
  name,
  architectors_quantity,
}) => {
  return (
    <div
      style={{
        padding: 20,
        border: '1px solid greenyellow',
        borderRadius: 6,
      }}
    >
      <p>Project id: {project_id}</p>
      <p>Name: {name}</p>
      <p>Status: {status}</p>
      <p>Architectors quantity: {architectors_quantity}</p>
    </div>
  );
};

export default ProjectItem;
