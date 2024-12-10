import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.tsx'
import Signup from './components/Signup.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:'/signup',
    element:<Signup />,
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
