export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const handleApiError = async (response: Response): Promise<ApiResponse> => {
  const errorData = await response.json().catch(() => ({}));
  const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;

  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  return { success: false, error: errorMessage, ...errorData };
};

export const authApi = async <T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      return await handleApiError(response);
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please check your connection.'
    };
  }
};

export class AuthService {
  static async login(email: string, password: string, remember: boolean = false): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: '1',
            email: email,
            name: email.split('@')[0]
          }
        });
      }, 500);
    });
  }

  static async register(email: string, password: string, agreedToTos: boolean): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: '1',
            email: email,
            name: email.split('@')[0]
          }
        });
      }, 500);
    });
  }

  static async logout(): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 200);
    });
  }

  static async getCurrentUser(): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'Not authenticated'
        });
      }, 200);
    });
  }
}

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await authApi('/health');
    return response.success;
  } catch {
    return false;
  }
};
