import React from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Button
} from "reactstrap";
import './Homepage.css'

const Homepage = ({ currUser }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/${id}`)
  }
  let JSONCurrUser
  if (currUser !== '' && currUser !== undefined)
  {
    JSONCurrUser = JSON.parse(currUser)
  }

  return (
    <div className='text'>
      <h2>Jobly</h2>
      <p>All the jobs in one, convenient place.</p>
      {JSONCurrUser ? <h2>Welcome back, {JSONCurrUser.firstName}</h2> : 
      <div>
        <Button className="me-2" color="primary" onClick={() => handleClick('login')}>Log in</Button>
        <Button color="primary" onClick={() => handleClick('signup')}>Sign up</Button>
      </div>
      }
    </div>
  )
}

export default Homepage
