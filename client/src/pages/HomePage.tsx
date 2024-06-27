import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { Project } from '../types/projects';
import ProjectList from '../components/ProjectList';
import ProjectService from '../services/ProjectService';

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user, logout, refreshAccessToken } = useContext(AuthContext);
  const navigate = useNavigate({
    from: '/',
  });

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  useEffect(() => {
    if (!user) {
      refreshAccessToken();
    }
  }, [user]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await ProjectService.getProjects();
      setProjects(data);
    };

    if (!projects.length) {
      getProjects();
    }
  }, [projects]);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p>Welcome back {user?.email}! </p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default HomePage;
