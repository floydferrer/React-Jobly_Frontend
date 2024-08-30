import React from 'react';
import { BrowserRouter } from "react-router-dom";
import PageNav from './PageNav';
import Homepage from './Homepage';
import Companies from './Companies';
import CompanyInfo from './CompanyInfo';
import Jobs from './Jobs';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Profile from './Profile';
import NotFound from './NotFound';
import { Routes, Route } from "react-router-dom";
import useLocalStorageState from './hooks/useLocalStorageState';
import JoblyApi from "./api/api";

import './App.css';

function App() {
  const [token, setToken] = useLocalStorageState('token', '');
  const [currUser, setCurrUser] = useLocalStorageState('currUser', '')

  const registerUser = async (user) => {
    try {
      const res = await JoblyApi.registerUser(user)
      setToken(res.token)
      const newCurrUser = await JoblyApi.getCurrUser(user.username, res)
      setCurrUser(JSON.stringify(newCurrUser))
    } catch (error) {
      return error
    }
    
  }

  const updateUser = async (user) => {
    const updatedUser = await JoblyApi.updateUser(user, token)
    setCurrUser(JSON.stringify(updatedUser))
  }

  const loginUser = async (user) => {
    try {
      const res = await JoblyApi.loginUser(user)
      setToken(res.token)
      const newCurrUser = await JoblyApi.getCurrUser(user.username, res)
      setCurrUser(JSON.stringify(newCurrUser))
    } catch (error) {
      return error
    }
    
  }

  const applyJob = async (user, job) => {
    await JoblyApi.applyJob(user, job, token)
  }

  return (
    <div className="App">

      <BrowserRouter>
        <PageNav token={token} currUser={currUser}/>
        <Routes>
          <Route exact path="/" element={<Homepage currUser={currUser}/>} />
          <Route exact path="/login" element={<Login loginUser={loginUser} token={token} />} />
          <Route exact path="/logout" element={<Logout token={token} setToken={setToken} setCurrUser={setCurrUser} />} />
          <Route exact path="/signup" element={<Signup registerUser={registerUser} token={token} />} />
          <Route exact path="/profile" element={<Profile updateUser={updateUser} token={token} currUser={currUser} />} />
          <Route exact path="/companies" element={<Companies token={token} title="Companies" />} />
          <Route path="/companies/:handle" element={<CompanyInfo title="Company Info" token={token} applyJob={applyJob}/>} />
          <Route exact path="/jobs" element={<Jobs title="Jobs" token={token} currUser={currUser} applyJob={applyJob} />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
