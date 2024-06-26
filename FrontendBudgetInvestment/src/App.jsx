import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import AddExpenses from './pages/AddExpenses'
import NotFoundPage from './pages/NotFoundPage'
import AddDeposits from './pages/AddDeposits'
import AddRemoveSavings from './pages/AddRemoveSavings'
import Account from './pages/Account'
import Savings from './pages/Savings'
import Profile from './pages/Profile'

function App() {
  
 
  const router = createBrowserRouter(
    [
      { path: '/', element: <Login />},
      { path: '/register', element: <Register />},
      { path: '/dashboard', element: <DashBoard/>},
      { path: '/addExpenses', element: <AddExpenses/>},
      { path: '/addDeposits', element: <AddDeposits/>},
      { path: '/addRemoveSavings', element: <AddRemoveSavings/>},
      { path: '/account', element: <Account/>},
      { path: '/savings', element: <Savings/>},
      { path: '/profile', element: <Profile/>},
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
