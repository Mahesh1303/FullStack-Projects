import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout.jsx';
import HomePage from './components/pages/HomePage.jsx';
import LoginPage from './components/pages/LoginPage.jsx'; // Ensure the file name is correct
import AdminDashboard from './components/pages/AdminDashboard.jsx';
import UserDashboard from './components/pages/UserDashboard.jsx';
import RegisterForm from './components/pages/login/RegistrationForm.jsx';
import { NomineeProvider } from './NomineeContext'; // Import your NomineeProvider

// Define the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // This will render HomePage as the default route at "/"
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin-dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'user-dashboard',
        element: <UserDashboard />,
      },
    ],
  },
]);

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <NomineeProvider> {/* Wrap your RouterProvider in NomineeProvider */}
      <RouterProvider router={router} />
    </NomineeProvider>
  </StrictMode>
);
