import React from 'react'
import { Navigate } from 'react-router-dom'

const Logout = ({setToken, setCurrUser}) => {
  localStorage.setItem('token' ,'');
  localStorage.setItem('currUser' ,'');
  setToken('')
  setCurrUser('')
  
  return <Navigate to='/' />
}

export default Logout
