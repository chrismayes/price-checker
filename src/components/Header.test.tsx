import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header with the correct title', () => {
  render(<Header />);
  const titleElement = screen.getByText(/Grocery Price Checker/i);
  expect(titleElement).toBeInTheDocument();
});
