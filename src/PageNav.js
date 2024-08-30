import React from 'react'
import { useLocation } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageNav.css'

const PageNav = ({token}) => {
  const location = useLocation()
  let JSONCurrUser;
  if (window.localStorage.currUser !== '' && window.localStorage.currUser !== undefined){
    JSONCurrUser = JSON.parse(window.localStorage.currUser)
  }

  return (
    <div>
      <Navbar className="bg-white">
        <NavbarBrand href="/">Jobly</NavbarBrand>
          <Nav className="ml-auto flex-row" navbar>
            <NavItem className="me-5">
              <NavLink className={`nav-link ${location.pathname === "/companies" ? "active" : ""}`} href="/companies">Companies</NavLink>
            </NavItem>
            <NavItem className="me-5">
              <NavLink className={`nav-link ${location.pathname === "/jobs" ? "active" : ""}`} href="/jobs">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem className="me-5">
              <NavLink className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} href="/profile">
                Profile
              </NavLink>
            </NavItem>
            {(token !== '' && window.localStorage.currUser !== '') && <NavItem className="me-2">
              <NavLink href="/logout">
                Log Out {JSONCurrUser.firstName}
              </NavLink>
            </NavItem>}
          </Nav>
      </Navbar>
    </div>
  )
}

export default PageNav
