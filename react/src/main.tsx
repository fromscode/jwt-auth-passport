import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.tsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Error404 from './pages/Error404.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Error500 from './pages/Error500.tsx';
import Profile from './pages/Profile.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    ErrorBoundary: Error500
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    ErrorBoundary: Error500
  },
  {
    path: '/profile',
    Component: Profile,
    ErrorBoundary: Error500
  },
  {
    path: '/login',
    Component: Login,
    ErrorBoundary: Error500
  },
  {
    path: '/register',
    Component: Register,
    ErrorBoundary: Error500
  },
  {
    path: "/*",
    Component: Error404,
    ErrorBoundary: Error500
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
