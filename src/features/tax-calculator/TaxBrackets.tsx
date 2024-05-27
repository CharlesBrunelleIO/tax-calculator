import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/hooks';
import { TaxBracketPlusAmount } from '../../stores/TaxReducer';

const TaxBrackets: React.FC = () => {
  const brackets = useAppSelector(state => state.tax.brackets) as TaxBracketPlusAmount[];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Minimum</th>
          <th>Maximum</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {brackets?.map((bracket, index) => {
          return (
            <tr key={index}>
              <td>{bracket.min}</td>
              <td>{bracket.max || ''}</td>
              <td>{Math.round(bracket.rate * 10000) / 100} %</td>
              <td
                data-testid="tax-bracket-amount"
              >{bracket.amount} $
              </td>
            </tr>
          );
        })}
      </tbody>

    </Table>
  );
};

export default TaxBrackets;
