import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import useFields from './hooks/useFields'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Alert
  } from "reactstrap";

const Profile = ({updateUser}) => {
  if(window.localStorage.token === '' || window.localStorage.token === undefined) return <Navigate to="/login" />
  const JSONCurrUser = JSON.parse(window.localStorage.currUser)
  const [profileUpdated, setProfileUpdated] = useState(false)
  
  const [formData, handleChange] = useFields({
    username: JSONCurrUser.username,
    firstName: JSONCurrUser.firstName,
    lastName: JSONCurrUser.lastName,
    email: JSONCurrUser.email
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdated(false)
    await updateUser(formData);
    setProfileUpdated(true)
  }
  
  return (
    <div>
        <h2 className="mx-auto col-md-4 mt-5 text-white">Profile</h2>
        <Form className="col-md-4 mt-3 py-4 px-4 container-fluid bg-white rounded" onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="username" className="fw-bold">
                Username
                </Label>
                <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                disabled
                />
            </FormGroup>
            <FormGroup>
                <Label for="firstName" className="fw-bold">
                First Name
                </Label>
                <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName" className="fw-bold">
                Last Name
                </Label>
                <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label for="email" className="fw-bold">
                Email
                </Label>
                <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                />
            </FormGroup>
            <div className="d-grid gap-2">
                <Button color="primary">
                    Save Changes
                </Button>
            </div>
            {profileUpdated && <div>
                <Alert className='mt-3 mb-1' color='success'>
                    Profile updated
                </Alert>
            </div>}
        </Form>
    </div>
  )
}

export default Profile