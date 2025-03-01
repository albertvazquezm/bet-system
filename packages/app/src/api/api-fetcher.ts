import { ApiError } from '@/rq/error-handler';
import { config } from '../config';

export const apiFetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = config.apiBaseUrl;
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      ...(options.method === 'POST' || options.method === 'PUT' ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json();
};


