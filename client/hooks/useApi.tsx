import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseApiMutationResult<T> {
  mutate: (data?: any) => Promise<T>;
  loading: boolean;
  error: string | null;
}

function useApi<T>(endpoint: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data || result);
      } else {
        throw new Error(result.message || 'API request failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, user]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

function useApiMutation<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): UseApiMutationResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data?: any): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        return result.data || result;
      } else {
        throw new Error(result.message || 'API request failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
  };
}

// Specific API hooks
export const useResumes = () => {
  return useApi<{ resumes: any[]; pagination: any }>('/resumes');
};

export const useCoverLetters = () => {
  return useApi<{ coverLetters: any[]; pagination: any }>('/cover-letters');
};

export const useJobApplications = () => {
  return useApi<{ applications: any[]; pagination: any }>('/job-applications');
};

export const useJobApplicationStats = () => {
  return useApi<{ stats: any }>('/job-applications/stats');
};

export const usePortfolio = () => {
  return useApi<{ projects: any[] }>('/portfolio');
};

export const useInterviewSessions = () => {
  return useApi<{ sessions: any[] }>('/interviews/sessions');
};

export const useAnalytics = () => {
  return useApi<{ analytics: any }>('/analytics/dashboard');
};

// Mutation hooks
export const useCreateResume = () => {
  return useApiMutation('/resumes', 'POST');
};

export const useCreateCoverLetter = () => {
  return useApiMutation('/cover-letters/generate', 'POST');
};

export const useCreateJobApplication = () => {
  return useApiMutation('/job-applications', 'POST');
};

export const useCreatePortfolioProject = () => {
  return useApiMutation('/portfolio', 'POST');
};

export const useCreateInterviewSession = () => {
  return useApiMutation('/interviews/sessions', 'POST');
};

export { useApi, useApiMutation };