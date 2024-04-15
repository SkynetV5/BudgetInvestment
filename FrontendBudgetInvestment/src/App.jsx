import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import AddExpenses from './pages/AddExpenses'
import NotFoundPage from './pages/NotFoundPage'

function App() {


  const router = createBrowserRouter(
    [
      { path: '/', element: <Login />},
      { path: '/register', element: <Register />},
      { path: '/dashboard', element: <DashBoard/>},
      { path: '/addExpenses', element: <AddExpenses/>},
      { path: '*', element: <NotFoundPage/>}
    ]
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
