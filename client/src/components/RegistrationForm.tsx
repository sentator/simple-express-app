import { Link } from '@tanstack/react-router';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const { registration } = useContext(AuthContext);

  const handleSubmit = () => {
    registration({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
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
          <label>
            <span style={{ display: 'block' }}>First name:</span>
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span style={{ display: 'block' }}>Last name:</span>
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Sign up
          </button>
          <Link to="/login">I have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
