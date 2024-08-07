import { Link, useNavigate, useRouter } from '@tanstack/react-router';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const navigate = useNavigate({
    from: '/login',
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    await login(email, password);
    await router.invalidate();
    // hack to wait AuthContext to update
    await new Promise((res) => setTimeout(res, 1));
    navigate({ to: '/projects' });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form>
        <div>
          <label>
            <span style={{ display: 'block' }}>Email:</span>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span style={{ display: 'block' }}>Password:</span>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Log in
          </button>
          <Link to="/registration">I don't have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
