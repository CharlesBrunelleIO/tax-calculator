import { describe, expect, test } from '@jest/globals';
import { TaxBracket, TaxBrackets } from '../services/TaxBracketsAPI';
import { calculateTax, calculateTaxPerBracket } from './CalculateTax';

describe('Calculate Tax', () => {
  test('calculateTaxPerBracket Should return tax when salary is over bracket', () => {
    expect(calculateTaxPerBracket(250000,
      {
        min: 100392,
        max: 155625,
        rate: 0.26,
      } satisfies TaxBracket as TaxBracket)).toBe(14361);
  });

  test('calculateTaxPerBracket Should return tax when salary is over bracket without max', () => {
    expect(calculateTaxPerBracket(250000,
      {
        min: 221708,
        rate: 0.33,
      } satisfies TaxBracket as TaxBracket)).toBe(9336);
  });

  test('calculateTaxPerBracket Should return tax when salary is in bracket', () => {
    expect(calculateTaxPerBracket(75000,
      {
        min: 50197,
        max: 100392,
        rate: 0.205,
      } satisfies TaxBracket as TaxBracket)).toBe(5085);
  });

  test('calculateTaxPerBracket Should return tax when salary is under bracket', () => {
    expect(calculateTaxPerBracket(43000,
      {
        min: 50197,
        max: 100392,
        rate: 0.205,
      } satisfies TaxBracket as TaxBracket)).toBe(0);
  });

  test('calculateTax Should return tax when salary is over all brackets', () => {
    const brackets = {
      tax_brackets: [
        {
          min: 0,
          max: 50197,
          rate: 0.15,
        },
        {
          min: 50197,
          max: 100392,
          rate: 0.205,
        },
        {
          min: 100392,
          max: 155625,
          rate: 0.26,
        },
        {
          min: 155625,
          max: 221708,
          rate: 0.29,
        },
        {
          min: 221708,
          rate: 0.33,
        },
      ],
    } satisfies TaxBrackets as TaxBrackets;
    expect(calculateTax(250000, brackets)).toBe(60681);
  });

  test('calculateTax Should return tax when salary is some brackets', () => {
    const brackets = {
      tax_brackets: [
        {
          min: 0,
          max: 50197,
          rate: 0.15,
        },
        {
          min: 50197,
          max: 100392,
          rate: 0.205,
        },
        {
          min: 100392,
          max: 155625,
          rate: 0.26,
        },
        {
          min: 155625,
          max: 221708,
          rate: 0.29,
        },
        {
          min: 221708,
          rate: 0.33,
        },
      ],
    } satisfies TaxBrackets as TaxBrackets;
    expect(calculateTax(100000, brackets)).toBe(17740);
  });
});
