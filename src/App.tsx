import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Playground from './pages/Playground.tsx';
import Academy from './pages/Academy.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/playground', element: <Playground /> },
      { path: '/academy', element: <Academy /> },

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
