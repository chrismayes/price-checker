import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ResetPasswordForm from '../pages/ResetPasswordForm';
import { renderWithProviders } from '../test-utils';

describe('Reset Password Form', () => {
  test('renders password fields and reset button', () => {
    renderWithProviders(<ResetPasswordForm />);
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  test('shows error if passwords do not match', () => {
    renderWithProviders(<ResetPasswordForm />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password456' } });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
