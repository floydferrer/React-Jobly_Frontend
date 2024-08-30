import React, { useState, useEffect } from 'react'
import { useParams, Navigate} from 'react-router-dom'
import useItems from './hooks/useItems';
import JoblyApi from "./api/api";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
  } from "reactstrap";
import './CompanyInfo.css'

const CompanyInfo = ({applyJob}) => {
  const token = window.localStorage.token
  if(token === '' || token === undefined) return <Navigate to="/login" />
  
  const JSONCurrUser = JSON.parse(window.localStorage.currUser)
  const [user, setUser] = useItems('users', {JSONCurrUser, token});
  
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState([]);
  

  useEffect(() => {
      async function getCompanyInfo() {
        const res = await JoblyApi.getCompany(handle);
        setCompanyInfo(res)
        console.log(res)
        setIsLoading(false);
      }
      getCompanyInfo()
    }, []);
  
  const handleApply = (id) => {
    applyJob(JSONCurrUser.username, id, token)
    setUser(user => ({...user, applications: [...user.applications, id]}))
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div>
     <section className="container-fluid col-md-8">
        <h2 className="mt-5 text-white">{companyInfo.name}</h2>
        <p className="company-description text-white">{companyInfo.description}</p>
        {companyInfo.jobs.map(job => (
            <Card className="mt-2">
                <CardBody>
                    <CardTitle className="fw-bold">
                        {job.title}
                    </CardTitle>
                    {job.salary && <CardText className="mb-0">
                        Salary: {job.salary.toLocaleString()}
                    </CardText>}
                    {job.equity && <CardText className="mb-0">
                        Equity: {job.equity}
                    </CardText>}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        {
                          user.applications !== undefined && user.applications.find((id) => id === job.id)
                          ? <Button color="success" disabled onClick={() => handleApply(job.id)}>Applied</Button>
                          : <Button color="danger" onClick={() => handleApply(job.id)}>Apply</Button>
                        }
                    </div>
                    
                </CardBody>
            </Card>
        ))}
      </section>
    </div>
  )
}

export default CompanyInfo
