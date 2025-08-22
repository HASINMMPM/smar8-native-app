// API Endpoints Constants
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    REGISTER_USER: 'api/auth/register',
    LOGIN: 'api/auth/login',
    LOGOUT: 'api/auth/logout',
    REFRESH_TOKEN: 'api/auth/refresh',
    FORGOT_PASSWORD: 'api/auth/forgot-password',
    RESET_PASSWORD: 'api/auth/reset-password',
  },
  
  // User management endpoints
  USERS: {
    GET_PROFILE: 'api/users/profile',
    UPDATE_PROFILE: 'api/users/profile',
    DELETE_ACCOUNT: 'api/users/account',
    CHANGE_PASSWORD: 'api/users/change-password',
  },
  
  // Building management endpoints
  BUILDINGS: {
    GET_ALL: 'api/buildings',
    GET_BY_ID: (id: string) => `api/buildings/${id}`,
    CREATE: 'api/buildings',
    UPDATE: (id: string) => `api/buildings/${id}`,
    DELETE: (id: string) => `api/buildings/${id}`,
  },
  
  // Room management endpoints
  ROOMS: {
    GET_ALL: 'api/rooms',
    GET_BY_ID: (id: string) => `api/rooms/${id}`,
    GET_BY_BUILDING: (buildingId: string) => `api/buildings/${buildingId}/rooms`,
    CREATE: 'api/rooms',
    UPDATE: (id: string) => `api/rooms/${id}`,
    DELETE: (id: string) => `api/rooms/${id}`,
  },
  
  // Document management endpoints
  DOCUMENTS: {
    GET_ALL: 'api/documents',
    GET_BY_ID: (id: string) => `api/documents/${id}`,
    UPLOAD: 'api/documents/upload',
    UPDATE: (id: string) => `api/documents/${id}`,
    DELETE: (id: string) => `api/documents/${id}`,
    ANALYZE: (id: string) => `api/documents/${id}/analyze`,
  },
  
  // Payment endpoints
  PAYMENTS: {
    GET_HISTORY: 'api/payments',
    CREATE_PAYMENT: 'api/payments',
    GET_PAYMENT_STATUS: (id: string) => `api/payments/${id}/status`,
    REFUND: (id: string) => `api/payments/${id}/refund`,
  },
} as const;

// Individual endpoint constants for backward compatibility
export const REGISTRATION_USER = API_ENDPOINTS.AUTH.REGISTER_USER;

// Type for API endpoints
export type ApiEndpoint = typeof API_ENDPOINTS;
