import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTaxBracketsByYear, TaxBracket } from '../services/TaxBracketsAPI';
import { calculateTax, calculateTaxPerBracket } from '../utils/CalculateTax';

const initialState = {
  tax: 0,
  error: '',
  year: 0,
  salary: 0,
  calculating: false,
  brackets: [] as TaxBracketPlusAmount[],
};

export interface TaxBracketPlusAmount extends TaxBracket {
  amount: number
}

type TaxState = typeof initialState;

function logUnknownError(error: unknown) {
  let stringified = 'Unable to stringify the thrown error';
  try {
    stringified = JSON.stringify(error);
  }
  catch {}
  console.error(stringified);
}

export const calculateTaxByYearAndSalary = createAsyncThunk<TaxState, { year: number, salary: number }>(
  'users/fetchByIdStatus',
  async (args, { dispatch }) => {
    const { year, salary } = args;
    let error = '';
    let brackets = [] as TaxBracketPlusAmount[];
    let tax = 0;

    dispatch(taxSlice.actions.calculating(true));

    try {
      const taxBrackets = await fetchTaxBracketsByYear(year);
      brackets = taxBrackets.tax_brackets.map((bracket) => {
        return { ...bracket, amount: calculateTaxPerBracket(salary, bracket) } as TaxBracketPlusAmount;
      });
      tax = calculateTax(salary, taxBrackets);
    }
    catch (e: unknown) {
      if (e instanceof Error)
        error = e.message;
      else {
        logUnknownError(e);
        error = 'Unkown error';
      }
    }

    return {
      tax,
      error,
      year,
      salary,
      brackets,
      calculating: false,
    } satisfies TaxState as TaxState;
  },
);

const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    calculating(state, action: PayloadAction<boolean>) {
      state.calculating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateTaxByYearAndSalary.fulfilled, (state, action) => {
      state.tax = action.payload.tax;
      state.error = action.payload.error;
      state.salary = action.payload.salary;
      state.year = action.payload.year;
      state.brackets = action.payload.brackets;
      state.calculating = action.payload.calculating;
    });
  },
});

export default taxSlice.reducer;
