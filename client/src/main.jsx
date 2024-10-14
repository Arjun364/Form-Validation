import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// pages
import LandingPage from './pages/LandingPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'

// routes
const router = createBrowserRouter([
  // the landing page section
  {
    path:'/',
    element:<LandingPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/home',
    element:<Home/>,
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
