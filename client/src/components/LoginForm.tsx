import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login } = useContext(AuthContext);

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
        <button type="button" onClick={() => login(email, password)}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
