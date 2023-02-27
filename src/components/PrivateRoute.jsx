import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from '../components/Spinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()
  //const loggedIn = false

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
