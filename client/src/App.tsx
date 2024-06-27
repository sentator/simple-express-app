import { useContext } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { AuthContext } from './context/AuthContext';
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

  return <RouterProvider router={router} context={{ auth: authContext }} />;
}

export default App;
