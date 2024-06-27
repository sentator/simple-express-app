import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate({
    from: '/',
  });

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <div>
      <p>Welcome back {user?.email}! </p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default HomePage;
