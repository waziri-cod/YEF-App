/**
 * ============================================
 * MONGODB SERVICE
 * ============================================
 * MongoDB operations for loans, loan packages, and other data
 * Replaces Firestore with MongoDB backend
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a MongoDB Atlas account (mongodb.com/cloud/atlas)
 * 2. Set up a cluster and database
 * 3. Add .env.local variables:
 *    VITE_MONGODB_URI=your_connection_string
 *    VITE_API_BASE_URL=http://localhost:5050 (or your backend URL)
 */

// Types for MongoDB operations
export interface LoanPackage {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  duration: number;
  disbursementDays?: number;
  category: string;
  features: string[];
  requirements: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoanApplication {
  _id?: string;
  userId: string;
  packageId: string;
  amount: number;
  purpose: string;
  businessInfo?: string;
  monthlyIncome: number;
  repaymentMonths: number;
  documents: string[];
  status: "pending" | "approved" | "rejected" | "disbursed" | "active" | "completed";
  applicationDate: Date;
  approvalDate?: Date;
  disbursalDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Payment {
  _id?: string;
  loanId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  createdAt?: Date;
}

// Base API URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

// Helper function for API calls with auth
async function apiCall(
  endpoint: string,
  method: string = "GET",
  body?: unknown
): Promise<unknown> {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * LOAN PACKAGE OPERATIONS
 */
export const loanPackageService = {
  /**
   * Get all loan packages
   */
  async getAllPackages(): Promise<LoanPackage[]> {
    try {
      const data = await apiCall("/loan-packages");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching loan packages:", error);
      // Return empty array if API fails
      return [];
    }
  },

  /**
   * Get single loan package by ID
   */
  async getPackageById(id: string): Promise<LoanPackage | null> {
    try {
      const data = await apiCall(`/loan-packages/${id}`);
      return data as LoanPackage;
    } catch (error) {
      console.error("Error fetching loan package:", error);
      return null;
    }
  },

  /**
   * Create new loan package (admin only)
   */
  async createPackage(packageData: LoanPackage): Promise<LoanPackage> {
    try {
      const data = await apiCall("/loan-packages", "POST", packageData);
      return data as LoanPackage;
    } catch (error) {
      console.error("Error creating loan package:", error);
      throw error;
    }
  },

  /**
   * Update loan package (admin only)
   */
  async updatePackage(id: string, packageData: Partial<LoanPackage>): Promise<LoanPackage> {
    try {
      const data = await apiCall(`/loan-packages/${id}`, "PUT", packageData);
      return data as LoanPackage;
    } catch (error) {
      console.error("Error updating loan package:", error);
      throw error;
    }
  },

  /**
   * Delete loan package (admin only)
   */
  async deletePackage(id: string): Promise<void> {
    try {
      await apiCall(`/loan-packages/${id}`, "DELETE");
    } catch (error) {
      console.error("Error deleting loan package:", error);
      throw error;
    }
  },

  /**
   * Get packages by category
   */
  async getPackagesByCategory(category: string): Promise<LoanPackage[]> {
    try {
      const data = await apiCall(`/loan-packages/category/${category}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching packages by category:", error);
      return [];
    }
  },
};

/**
 * LOAN APPLICATION OPERATIONS
 */
export const loanApplicationService = {
  /**
   * Create new loan application
   */
  async createApplication(applicationData: LoanApplication): Promise<LoanApplication> {
    try {
      const data = await apiCall("/loan-applications", "POST", applicationData);
      return data as LoanApplication;
    } catch (error) {
      console.error("Error creating loan application:", error);
      throw error;
    }
  },

  /**
   * Get user's loan applications
   */
  async getUserApplications(userId: string): Promise<LoanApplication[]> {
    try {
      const data = await apiCall(`/loan-applications/user/${userId}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching user applications:", error);
      return [];
    }
  },

  /**
   * Get single application
   */
  async getApplication(id: string): Promise<LoanApplication | null> {
    try {
      const data = await apiCall(`/loan-applications/${id}`);
      return data as LoanApplication;
    } catch (error) {
      console.error("Error fetching loan application:", error);
      return null;
    }
  },

  /**
   * Update application status
   */
  async updateApplicationStatus(
    id: string,
    status: LoanApplication["status"]
  ): Promise<LoanApplication> {
    try {
      const data = await apiCall(`/loan-applications/${id}/status`, "PATCH", { status });
      return data as LoanApplication;
    } catch (error) {
      console.error("Error updating application status:", error);
      throw error;
    }
  },

  /**
   * Approve application
   */
  async approveApplication(id: string): Promise<LoanApplication> {
    try {
      const data = await apiCall(`/loan-applications/${id}/approve`, "PATCH");
      return data as LoanApplication;
    } catch (error) {
      console.error("Error approving application:", error);
      throw error;
    }
  },

  /**
   * Reject application
   */
  async rejectApplication(id: string, reason: string): Promise<LoanApplication> {
    try {
      const data = await apiCall(`/loan-applications/${id}/reject`, "PATCH", { reason });
      return data as LoanApplication;
    } catch (error) {
      console.error("Error rejecting application:", error);
      throw error;
    }
  },

  /**
   * Disburse loan
   */
  async disburseLoan(id: string): Promise<LoanApplication> {
    try {
      const data = await apiCall(`/loan-applications/${id}/disburse`, "PATCH");
      return data as LoanApplication;
    } catch (error) {
      console.error("Error disbursing loan:", error);
      throw error;
    }
  },
};

/**
 * PAYMENT OPERATIONS
 */
export const paymentService = {
  /**
   * Record payment
   */
  async recordPayment(paymentData: Payment): Promise<Payment> {
    try {
      const data = await apiCall("/payments", "POST", paymentData);
      return data as Payment;
    } catch (error) {
      console.error("Error recording payment:", error);
      throw error;
    }
  },

  /**
   * Get loan payment history
   */
  async getLoanPaymentHistory(loanId: string): Promise<Payment[]> {
    try {
      const data = await apiCall(`/payments/loan/${loanId}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching payment history:", error);
      return [];
    }
  },

  /**
   * Get payment schedule for loan
   */
  async getPaymentSchedule(loanId: string): Promise<Payment[]> {
    try {
      const data = await apiCall(`/payments/schedule/${loanId}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching payment schedule:", error);
      return [];
    }
  },

  /**
   * Get user's payments
   */
  async getUserPayments(userId: string): Promise<Payment[]> {
    try {
      const data = await apiCall(`/payments/user/${userId}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching user payments:", error);
      return [];
    }
  },
};

/**
 * STATISTICS OPERATIONS
 */
export const statsService = {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    try {
      const data = await apiCall("/stats/dashboard");
      return data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return null;
    }
  },

  /**
   * Get loan statistics
   */
  async getLoanStats() {
    try {
      const data = await apiCall("/stats/loans");
      return data;
    } catch (error) {
      console.error("Error fetching loan stats:", error);
      return null;
    }
  },

  /**
   * Get payment statistics
   */
  async getPaymentStats() {
    try {
      const data = await apiCall("/stats/payments");
      return data;
    } catch (error) {
      console.error("Error fetching payment stats:", error);
      return null;
    }
  },
};

export default {
  loanPackageService,
  loanApplicationService,
  paymentService,
  statsService,
};
