import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.tsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Error404 from './pages/Error404.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage
  },
  {
    path: '/dashboard',
    Component: Dashboard
  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/register',
    Component: Register
  },
  {
    path: "/*",
    Component: Error404
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
