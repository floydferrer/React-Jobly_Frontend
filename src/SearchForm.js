import React from 'react'
import useFields from "./hooks/useFields";
import {
    Button,
    Form,
    Row,
    Col,
    Input
  } from "reactstrap";

const SearchForm = ({searchFor}) => {
  const [formData, handleChange] = useFields({
    name: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(formData.name.trim() || undefined)
  }
  
  return (
    <div>
      <Form className='mb-4' onSubmit={handleSubmit} >
        <Row className="g-4 align-items-center">
          <Col>
              <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter search term"
              />
          </Col>
          <Col>
            <Button color='primary'>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchForm
