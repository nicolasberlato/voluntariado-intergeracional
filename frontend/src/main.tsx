import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.tsx'
import Signup from './components/Signup.tsx'
import Login from './components/Login.tsx'
import LandingPage from './components/LandingPage.tsx'
import Perfil from "./components/Perfil.tsx";
import Encontros from './components/Encontros.tsx'
import MarcarEncontro from "./components/MarcarEncontro.tsx";

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
    path: "/encontros",
    element: <Encontros />,
  },
  {
    path: "/marcarencontro",
    element: <MarcarEncontro />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
