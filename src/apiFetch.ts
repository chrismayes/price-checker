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
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch (err) {
      // fallback if response isn’t JSON
      throw new Error(response.statusText);
    }

    // check for expired token first
    if (
      response.status === 401 &&
      errorData?.code === 'token_not_valid' &&
      Array.isArray(errorData.messages) &&
      errorData.messages.some((m: any) =>
        m.message && m.message.toLowerCase().includes('token is expired')
      )
    ) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login?message=token_expired';
      throw new Error('Token is expired');
    }

    // build a user‑friendly message:
    let message = errorData.detail;
    // if there's no .detail, but the JSON is an object of arrays, flatten it:
    if (!message && typeof errorData === 'object') {
      message = Object.entries(errorData)
        .map(([field, errs]) => {
          const joined = Array.isArray(errs) ? errs.join(' ') : `${errs}`;
          return `${field}: ${joined}`;
        })
        .join(' | ');
    }

    throw new Error(message || 'API request failed');
  }

  return response.json();
};
