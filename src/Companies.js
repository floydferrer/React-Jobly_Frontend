import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import JoblyApi from "./api/api";
import SearchForm from "./SearchForm";
import useItems from "./hooks/useItems";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import './Companies.css'

function Companies() {
  if(window.localStorage.token === '' || window.localStorage.token === undefined) return <Navigate to="/login" />
  
  const navigate = useNavigate();

  const [companies, setCompanies] = useItems('companies');

  const handleClick = (handle) => {
    navigate(`/companies/${handle}`)
  }

  const searchCompanies = async (name) => {
    setCompanies(await JoblyApi.getItems('companies', name))
  }

  return (
    <div>
      <section className="col-md-8 mt-4 container-fluid">
          <SearchForm searchFor={searchCompanies} />
          {companies.map(company => (
          <Card className='card mt-2' onClick={() => handleClick(company.handle)}>
              <CardBody>
                  <CardTitle className="fw-bold">
                      {company.name}
                  </CardTitle>
                  <CardText>
                      {company.description}
                  </CardText>
              </CardBody>
          </Card>
          ))}
      </section>
    </div>
  );
}

export default Companies
