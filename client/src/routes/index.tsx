import { createFileRoute, redirect } from '@tanstack/react-router';
import HomePage from '../pages/HomePage';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!localStorage.getItem('accessToken')) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: HomePage,
});
