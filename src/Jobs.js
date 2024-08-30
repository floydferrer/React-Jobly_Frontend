import React, { useState} from "react";
import { Navigate } from "react-router-dom";
import useItems from "./hooks/useItems";
import JoblyApi from "./api/api";
import SearchForm from "./SearchForm";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";
import './Jobs.css'

function Jobs({ applyJob }) {
  
  const token = window.localStorage.token
  if(token === '' || token === undefined) return <Navigate to="/login" />
  const JSONCurrUser = JSON.parse(window.localStorage.currUser)

  const [jobs, setJobs] = useItems('jobs');
  const [user, setUser, userIsLoading] = useItems('users', {JSONCurrUser, token});
  const [appliedJobsView, setAppliedJobsView] = useState(false)

  if(token === '' || token === undefined) return <Navigate to="/login" />
  const handleApply = (id) => {
    applyJob(JSONCurrUser.username, id, token)
    setUser(user => ({...user, applications: [...user.applications, id]}))
  }

  const searchJobs = async (title) => {
    setJobs(await JoblyApi.getItems('jobs', title))
  }

  if(userIsLoading) {
    return (
      <h2>Loading &hellip;</h2>
    )
  }

  return (
    <div>
      <section className="col-md-8 mt-4 container-fluid">
      <SearchForm searchFor={searchJobs} />
      <Row className="mx-0">
        <Col className={!appliedJobsView ? "bg-secondary text-center text-white fs-4" : "bg-white text-center fs-4"} style={{cursor: appliedJobsView ? 'pointer' : 'default'}} onClick={() => setAppliedJobsView(false)}>
          Available Jobs
        </Col>
        <Col className={appliedJobsView ? "bg-secondary text-center text-white fs-4" : "bg-white text-center fs-4"} style={{cursor: !appliedJobsView ? 'pointer' : 'default'}} onClick={() => setAppliedJobsView(true)}>
          Jobs Applied
        </Col>
      </Row>
      {jobs.map(job => (
        <div>
          <section>
          {
            !appliedJobsView && user.applications !== undefined && !user.applications.find((id) => id === job.id) &&
                <Card className='card mt-2'>
                <CardBody>
                    <CardTitle className="fw-bold mt-1 mb-1">
                        {job.title}
                    </CardTitle>
                    <CardText className="mb-2">
                        {job.companyName}
                    </CardText>
                    {job.salary && <CardText className="mb-0">
                            Salary: {job.salary.toLocaleString()}
                        </CardText>}
                    {job.equity && <CardText className="mb-0">
                        Equity: {job.equity}
                    </CardText>}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button color="danger" onClick={() => handleApply(job.id)}>Apply</Button>
                    </div>
                </CardBody>
                </Card>
          }
          </section>
          <section>
          {
            appliedJobsView && user.applications !== undefined && user.applications.find((id) => id === job.id) &&
                <Card className='card mt-2'>
                <CardBody>
                    <CardTitle className="fw-bold mt-1 mb-1">
                        {job.title}
                    </CardTitle>
                    <CardText className="mb-2">
                        {job.companyName}
                    </CardText>
                    {job.salary && <CardText className="mb-0">
                            Salary: {job.salary.toLocaleString()}
                        </CardText>}
                    {job.equity && <CardText className="mb-0">
                        Equity: {job.equity}
                    </CardText>}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button disabled color="success">Applied</Button>
                    </div>
                </CardBody>
                </Card>
          }
          </section>
        </div>
      ))}
      {/* {jobs.map(job => (
          <Card className='card mt-2'>
              <CardBody>
                  <CardTitle className="fw-bold mt-1 mb-1">
                      {job.title}
                  </CardTitle>
                  <CardText className="mb-2">
                      {job.companyName}
                  </CardText>
                  {job.salary && <CardText className="mb-0">
                          Salary: {job.salary.toLocaleString()}
                      </CardText>}
                  {job.equity && <CardText className="mb-0">
                      Equity: {job.equity}
                  </CardText>}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      {
                        user.applications !== undefined && user.applications.find((id) => id === job.id)
                        ? <Button disabled color="danger">Applied</Button>
                        : <Button color="danger" onClick={() => handleApply(job.id)}>Apply</Button>
                      }
                  </div>
              </CardBody>
          </Card>
      ))} */}
      </section>
    </div>
  );
}

export default Jobs