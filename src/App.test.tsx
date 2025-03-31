import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header correctly', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/Grocery Price Checker/i);
  expect(headerElements.length).toBeGreaterThan(0);
});