import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Login from '../pages/Login';

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  const actualRrd = jest.requireActual('react-router-dom');
  return {
    ...actualRrd,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(() => jest.fn()),
  };
});

const mockNavigate = require('react-router-dom').useNavigate;

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockNavigate.mockReturnValue(jest.fn());
    delete window.location;
    window.location = { href: '' } as any;
  });

  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('allows user to input email and password', () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits form, stores token, and navigates on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access: 'mock-access', refresh: 'mock-refresh' }),
    });
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/token/`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'test@example.com', password: 'password123' }),
        })
      );
      expect(localStorage.getItem('access_token')).toBe('mock-access');
      expect(localStorage.getItem('refresh_token')).toBe('mock-refresh');
      expect(window.location.href).toBe('/');
    });
  });

  it('shows error message on login failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/username or email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('opens SignupModal when Sign Up button is clicked', async () => {
    renderWithProviders(<Login />);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    expect(screen.queryByRole('heading', { name: 'Sign Up' })).not.toBeInTheDocument();
    fireEvent.click(signUpButton);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    });
  });

  it('closes SignupModal when handleClose is called', async () => {
    renderWithProviders(<Login />);
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.click(signUpButton);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    });

    const modal = screen.getByRole('dialog');
    const cancelButton = within(modal).getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Sign Up' })).not.toBeInTheDocument();
    });
  });
});
