export interface ApiError {
  detail: string;
  code: string;
  messages?: Array<{
    token_class: string;
    token_type: string;
    message: string;
  }>;
}

/**
 * A wrapper function around fetch that automatically handles:
 * - Passing in the access token.
 * - Checking for token expiration.
 * - Redirecting to login if the token is expired.
 *
 * @param url The endpoint URL.
 * @param options Additional fetch options.
 * @returns Parsed JSON data from the response.
 */

export const apiFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
  const token = localStorage.getItem('access_token');
  if (token) {
    options.headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`
    };
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorData: ApiError | null = null;
    try {
      errorData = await response.json();
    } catch (err) {
      throw new Error(response.statusText);
    }

    if ( // Check if the error indicates an expired token.
      response.status === 401 &&
      errorData?.code === 'token_not_valid' &&
      errorData.messages &&
      errorData.messages.some((msg) =>
        msg.message && msg.message.toLowerCase().includes('token is expired')
      )
    ) {
      // If they do then force logout and redirect to login page.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login?message=token_expired';
      throw new Error('Token is expired');
    }

    throw new Error(errorData?.detail || 'API request failed');
  }

  return response.json();
};
