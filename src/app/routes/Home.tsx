import React from 'react';
import TaxForm from '../../features/tax-calculator/TaxForm';
import TaxTotal from '../../features/tax-calculator/TaxTotal';

const Home: React.FC = () => {
  return (
    <div className="container-sm">
      <h1 className="my-5">Tax Calculator</h1>
      <TaxForm />
      <hr className="my-3 md-4" />
      <TaxTotal />
    </div>
  );
};

export default Home;
