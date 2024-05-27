import { combineReducers, configureStore } from '@reduxjs/toolkit';
import TaxReducer from './TaxReducer';

const reducers = combineReducers({
  tax: TaxReducer,
});

export const store = configureStore({ reducer: reducers });
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
