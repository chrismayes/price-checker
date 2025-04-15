import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithProviders } from '../test-utils';

describe('Header Component', () => {
  test('renders logo that links to home page', () => {
    renderWithProviders(<Header />);
    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('displays user first name if token exists', () => {
    // Set up a fake token with payload containing a first name
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJmaXJzdF9uYW1lIjoiSm9obiIsInVzZXJuYW1lIjoiam9obmRvZSJ9.' +
      'fakeSignature';
    localStorage.setItem('access_token', fakeToken);

    renderWithProviders(<Header />);
    expect(screen.getByText(/john/i)).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });
});
