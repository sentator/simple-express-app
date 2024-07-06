import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    console.log({ context });
    if (!context.auth.accessToken && !localStorage.getItem('accessToken')) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const { logout, user, refreshAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  // set initial user data
  useEffect(() => {
    if (!user) {
      refreshAccessToken();
    }
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p>Welcome back {user?.email}!</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/">Home</Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
