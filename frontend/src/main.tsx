import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.tsx'
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'
import LandingPage from './components/LandingPage.tsx'
import Perfil from "./components/Perfil.tsx";
import Mensagens from './components/Mensagens.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/landingpage",
    element: <LandingPage />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/mensagens",
    element: <Mensagens />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
