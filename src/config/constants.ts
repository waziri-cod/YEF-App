/**
 * ============================================
 * APPLICATION CONSTANTS
 * ============================================
 * Centralized configuration and constants
 * Organized by: App Info → Routes → API → UI
 */

/* ============================================
   APPLICATION INFORMATION
   ============================================ */

export const APP_CONFIG = {
  name: "Youth Empower Finance",
  shortName: "YEF",
  description: "Empowering Tanzania's youth through accessible finance and education",
  version: "1.0.0",
  author: "Youth Empower Finance",
  website: "https://yef.co.tz",
  supportEmail: "info@yef.co.tz",
  supportPhone: "+255 123 456 789",
} as const;

/* ============================================
   ROUTE PATHS
   ============================================ */

export const ROUTES = {
  // Public Routes
  HOME: "/",
  SIGN_IN: "/signin",
  REGISTER: "/register",
  
  // Loan Routes
  LOANS: "/loans",
  LOAN_DETAILS: (id: string) => `/loan-details/${id}`,
  LOAN_APPLICATION: (id: string) => `/loan-application/${id}`,
  LOAN_POLICY: "/loan-policy",
  
  // Education Routes
  COURSES: "/courses",
  COURSE_DETAIL: (id: string) => `/course/${id}`,
  
  // Community Routes
  MENTORSHIP: "/mentorship",
  
  // User Routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  
  // Error Routes
  NOT_FOUND: "*",
} as const;

/* ============================================
   API ENDPOINTS
   ============================================ */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  
  // Loans
  LOANS: {
    LIST: "/api/loans",
    DETAIL: (id: string) => `/api/loans/${id}`,
    APPLY: (id: string) => `/api/loans/${id}/apply`,
    STATUS: (id: string) => `/api/loans/${id}/status`,
  },
  
  // Courses
  COURSES: {
    LIST: "/api/courses",
    DETAIL: (id: string) => `/api/courses/${id}`,
    ENROLL: (id: string) => `/api/courses/${id}/enroll`,
  },
  
  // AI Services
  AI: {
    CREDIT_SCORE: "/api/ai/credit-score",
    LOAN_ANALYSIS: "/api/ai/loan-analysis",
    CHAT: "/api/ai/chat",
  },
} as const;

/* ============================================
   UI CONSTANTS
   ============================================ */

export const UI_CONFIG = {
  // Animation Durations (ms)
  ANIMATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Breakpoints (matches Tailwind)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
  },
  
  // Z-Index Layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
} as const;

/* ============================================
   VALIDATION RULES
   ============================================ */

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: false,
    REQUIRE_LOWERCASE: false,
    REQUIRE_NUMBER: false,
    REQUIRE_SPECIAL: false,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

/* ============================================
   LOAN CONSTANTS
   ============================================ */

export const LOAN_CONFIG = {
  MIN_AMOUNT: 100000, // TZS
  MAX_AMOUNT: 5000000, // TZS
  DEFAULT_INTEREST_RATE: 12, // Percentage
  MIN_TERM_MONTHS: 3,
  MAX_TERM_MONTHS: 24,
  PROCESSING_TIME_HOURS: 24,
} as const;

/* ============================================
   ERROR MESSAGES
   ============================================ */

export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check your input and try again.",
  SERVER: "Server error. Please try again later.",
} as const;

/* ============================================
   SUCCESS MESSAGES
   ============================================ */

export const SUCCESS_MESSAGES = {
  REGISTERED: "Account created successfully! Welcome to YEF!",
  LOGGED_IN: "Welcome back! You've successfully signed in.",
  LOGGED_OUT: "You have been logged out successfully.",
  PROFILE_UPDATED: "Your profile has been updated successfully.",
  LOAN_APPLIED: "Your loan application has been submitted successfully.",
} as const;

