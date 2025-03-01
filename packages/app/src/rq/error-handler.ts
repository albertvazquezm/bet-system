import { toast } from 'sonner';
  
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
}

export const handleQueryClientError = (error: unknown) => {
  if (isApiError(error)) {
    switch (error.status) {
      case 401:
        toast.error('Session expired. Please login again.');
        return;
      case 403:
        toast.error('You don\'t have permission to perform this action');
        return;
      case 404:
        toast.error('The requested resource was not found');
        return;
      case 429:
        toast.error('Too many requests. Please try again later');
        return;
    }
  }
  toast.error('An unexpected error occurred');
}