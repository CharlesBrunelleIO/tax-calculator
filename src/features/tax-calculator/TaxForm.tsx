import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch } from '../../hooks/hooks';
import { calculateTaxByYearAndSalary } from '../../stores/TaxReducer';

type Values = {
  year: string
  salary: string
};

const TaxForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState<Values>({
    year: '',
    salary: '',
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      dispatch(calculateTaxByYearAndSalary({ year: Number(values.year), salary: Number(values.salary) }));
    }

    setValidated(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
            name="year"
            required
            type="number"
            placeholder="Tax Year"
            onChange={handleChange}
            value={values.year}
            data-testid="year-input"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a year.
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Control
            name="salary"
            required
            type="number"
            placeholder="Salary"
            onChange={handleChange}
            value={values.salary}
            data-testid="salary-input"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a salary.
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Button
            type="submit"
            data-testid="tax-submit-button"
          >
            Calculate Tax
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaxForm;
