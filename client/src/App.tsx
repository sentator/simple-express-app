import { useContext } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { AuthContext, AuthProvider } from './context/AuthContext';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: { auth: undefined },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authContext = useContext(AuthContext);
  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth: authContext }} />
    </AuthProvider>
  );
}

export default App;
