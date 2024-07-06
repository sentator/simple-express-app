import { createLazyFileRoute } from '@tanstack/react-router';

import RegistrationForm from '../components/RegistrationForm';

export const Route = createLazyFileRoute('/registration')({
  component: RegistrationForm,
});
