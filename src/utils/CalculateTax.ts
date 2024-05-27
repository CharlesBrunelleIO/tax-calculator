import { TaxBracket, TaxBrackets } from '../services/TaxBracketsAPI';

export function calculateTaxPerBracket(salary: number, bracket: TaxBracket): number {
  if (salary < bracket.min)
    return 0;

  let taxable = salary;
  if (bracket.max)
    taxable = Math.min(bracket.max, salary);

  taxable = taxable - bracket.min;

  // Using CRA rounding rule https://www.justice.gc.ca/eng/rp-pr/csj-sjc/legis-redact/legistics/p1p26.html
  return Math.round(taxable * bracket.rate);
}

export function calculateTax(salary: number, brackets: TaxBrackets): number {
  let tax = 0;

  brackets.tax_brackets.forEach((bracket) => {
    tax += calculateTaxPerBracket(salary, bracket);
  }, 0);
  return tax;
}
