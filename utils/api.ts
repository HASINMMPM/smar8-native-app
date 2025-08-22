import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

class ApiService {
  private instance: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    // For Expo development, we need to handle different environments
    let baseURL = process.env.EXPO_PUBLIC_API_URL;
    
    if (!baseURL) {
      // In Expo development, use your computer's IP address instead of localhost
      // You can get this from your computer's network settings
      // or by running 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux)
      baseURL = __DEV__ ? 'http://10.251.131.11:5000' : 'http://localhost:5000';
    }
    
    console.log('API Base URL:', baseURL);
    
    this.instance = axios.create({
      baseURL,
      timeout: 15000, // Increased timeout for mobile
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Smar8App/1.0', // Custom user agent for identification
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          

        } catch (error) {
          console.warn('Failed to get auth token from AsyncStorage:', error);
        }
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful responses (optional)
        console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        // Handle and log errors gracefully
        let errorMessage = 'An unexpected error occurred';
        
        if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
          errorMessage = 'Network connection failed. Please check your internet connection and try again.';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout. Please try again.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        const errorResponse: ApiError = {
          message: errorMessage,
          status: error.response?.status,
          data: error.response?.data,
        };

        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: errorResponse.status,
          message: errorResponse.message,
          data: errorResponse.data,
          errorCode: error.code,
          originalError: error.message,
        });

        return Promise.reject(errorResponse);
      }
    );
  }

  /**
   * GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Promise with response data
   */
  public async get<T = any>(endpoint: string, params?: object): Promise<T> {
    console.log('GET request:', {
      endpoint,
      params,
    });
    try {
      const response = await this.instance.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with response data
   */
  public async post<T = any>(endpoint: string, data?: object): Promise<T> {
    console.log('POST request:', {
      endpoint,
      data,
    });
    try {
      const response = await this.instance.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * PUT request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with response data
   */
  public async put<T = any>(endpoint: string, data?: object): Promise<T> {
    console.log('PUT request:', {
      endpoint,
      data,
    });
    try {
      const response = await this.instance.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * DELETE request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Promise with response data
   */
  public async delete<T = any>(endpoint: string, params?: object): Promise<T> {
    console.log('DELETE request:', {
      endpoint,
      params,
    });
    try {
      const response = await this.instance.delete<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * PATCH request (bonus method)
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with response data
   */
  public async patch<T = any>(endpoint: string, data?: object): Promise<T> {
    console.log('PATCH request:', {
      endpoint,
      data,
    });
    try {
      const response = await this.instance.patch<T>(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set custom headers for all requests
   * @param headers - Custom headers object
   */
  public setHeaders(headers: Record<string, string>): void {
    Object.assign(this.instance.defaults.headers.common, headers);
  }

  /**
   * Set authorization token manually
   * @param token - Authorization token
   */
  public setAuthToken(token: string): void {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Clear authorization token
   */
  public clearAuthToken(): void {
    delete this.instance.defaults.headers.common.Authorization;
  }

  /**
   * Get the underlying axios instance for advanced usage
   * @returns Axios instance
   */
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Update base URL dynamically
   * @param newBaseURL - New base URL
   */
  public updateBaseURL(newBaseURL: string): void {
    this.instance.defaults.baseURL = newBaseURL;
    console.log('API Base URL updated to:', newBaseURL);
  }
}

// Export singleton instance
const api = ApiService.getInstance();

export default api;

// Export the class for testing or advanced usage
export { ApiService };

// Export types for external usage
    export type { ApiError, ApiResponse };

