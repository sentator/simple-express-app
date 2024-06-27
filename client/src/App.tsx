import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <LoginForm />
      <RegistrationForm />
    </AuthProvider>
  );
}

export default App;
