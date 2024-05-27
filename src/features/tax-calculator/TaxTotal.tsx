import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Col, FormLabel, Row } from 'react-bootstrap';
import TaxBrackets from './TaxBrackets';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';

const TaxTotal: React.FC = () => {
  const { t } = useTranslation();
  const year = useAppSelector(state => state.tax.year);
  const salary = useAppSelector(state => state.tax.salary);
  const tax = useAppSelector(state => state.tax.tax);
  const error = useAppSelector(state => state.tax.error);
  const calculating = useAppSelector(state => state.tax.calculating);

  if (calculating)
    return (
      <FormLabel>
        {t('Calculating your tax, please wait.')}
      </FormLabel>
    );

  if (error)
    return (
      <Alert key="warning" variant="warning">{t(error, { year })}</Alert>
    );

  if (year === 0)
    return (<></>);

  return (
    <Row className="justify-content-start">
      <Col className="align-self-center">
        <TaxBrackets />
      </Col>
      <Col className="align-self-center">
        <Row className="justify-content-start">
          <FormLabel>
            {t('total tax summary', { year, tax })}
          </FormLabel>
        </Row>
        <Row className="justify-content-start">
          <FormLabel>
            {t('tax effective rate', { rate: Math.round(tax / salary * 10000) / 100 })}
          </FormLabel>
        </Row>
      </Col>
    </Row>
  );
};

export default TaxTotal;
