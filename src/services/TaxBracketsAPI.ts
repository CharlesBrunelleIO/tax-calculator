const BASE_URL = 'http://localhost:5001';
const PATH_URL = '/tax-calculator/tax-year/';

export type TaxBrackets = {
  tax_brackets: TaxBracket[]
};

export type TaxBracket = {
  min: number
  max?: number
  rate: number
};

export function fetchTaxBracketsByYear(year: number): Promise<TaxBrackets> {
  return fetch(`${BASE_URL}${PATH_URL}${year}`)
    .catch(() => {
      throw new Error('Tax API - Internal Server Error');
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Tax API - ' + response.statusText);
      }
      return response.json() as Promise<TaxBrackets>;
    });
}
