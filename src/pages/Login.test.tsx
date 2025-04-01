import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { renderWithProviders } from '../test-utils';

describe('Login Page', () => {
  test('renders login form fields', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

});
