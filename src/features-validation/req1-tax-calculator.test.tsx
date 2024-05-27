import React from 'react';
import { beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

import App from '../app/App';
import i18n from 'i18next';

// Documentation should be include a description of the feature or even better a link to the feature in the project management tool
// https://github.com/points/interview-test-server?tab=readme-ov-file#in-both-cases-it-should
describe('Req1 - The Assignment - Tax Calculator', () => {
  let fetchMockServer: SetupServerApi;

  beforeAll(() => {
    fetchMockServer = setupServer();
    fetchMockServer.listen();
  });

  beforeEach(() => {
    fetchMockServer.resetHandlers(http.get('http://localhost:5001/tax-calculator/tax-year/2022', () => {
      return HttpResponse.json({
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
      });
    }));

    render(
      <App />,
    );
  });

  test('Req1.1 Fetch the tax rates by year i.e. /tax-calculator/tax-year/[2019|2020|2021|2022]', async () => {
    const yearInput = screen.getByTestId('year-input');
    const salaryInput = screen.getByTestId('salary-input');
    const submitButton = screen.getByTestId('tax-submit-button');

    fireEvent.change(yearInput, { target: { value: '2022' } });
    fireEvent.change(salaryInput, { target: { value: '250000' } });

    fetchMockServer.use(http.get('http://localhost:5001/tax-calculator/tax-year/2022', () => {
      return new HttpResponse(null, {
        status: 500,
      });
    }, { once: true }));

    fireEvent.click(submitButton);
    expect(await screen.findByText(i18n.t('Tax API - Internal Server Error'))).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(await screen.findByText(i18n.t('total tax summary', { year: 2022, tax: 60681 }))).toBeInTheDocument();
  });

  test('Req1.2 Receive a yearly salary', () => {
    expect(screen.getByTestId('salary-input')).toBeDefined();
  });

  test('Req1.3 Calculate and display the total taxes owed for the salary', async () => {
    fillAndSubmitForm(2022, 250000);

    expect(await screen.findByText(i18n.t('total tax summary', { year: 2022, tax: 60681 }))).toBeInTheDocument();
  });

  test('Req1.4 Display the amount of taxes owed per band', async () => {
    fillAndSubmitForm(2022, 250000);

    const amounts = await screen.findAllByTestId('tax-bracket-amount');
    expect(amounts).toHaveLength(5);
  });

  test('Req1.5 Display the effective rate', async () => {
    expect(await screen.findByText(i18n.t('tax effective rate', { rate: 24.27 }))).toBeInTheDocument();
  });
});

function fillAndSubmitForm(year: number, salary: number) {
  const yearInput = screen.getByTestId('year-input');
  const salaryInput = screen.getByTestId('salary-input');
  const submitButton = screen.getByTestId('tax-submit-button');

  fireEvent.change(yearInput, { target: { value: year } });
  fireEvent.change(salaryInput, { target: { value: salary } });
  fireEvent.click(submitButton);
}
