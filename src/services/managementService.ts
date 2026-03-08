/**
 * Management System Service
 * Handles admin operations for tracking clients, loans, and providing follow-up
 */

import { doc, collection, getDoc, setDoc, updateDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ClientProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  profileImage?: string;
  businessName?: string;
  businessType?: string;
  location: string;
  joinDate: Date;
  status: 'active' | 'inactive' | 'suspended';
  kycVerified: boolean;
  totalLoansRequested: number;
  totalLoanAmount: number;
  totalLoansApproved: number;
  approvedAmount: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ManagementFollowUp {
  id: string;
  clientId: string;
  loanId?: string;
  assignedOfficer: string;
  type: 'check-in' | 'payment-reminder' | 'issue' | 'success-story' | 'other';
  subject: string;
  description: string;
  status: 'pending' | 'completed' | 'followup-needed';
  scheduledDate: Date;
  completedDate?: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanFollowUpTask {
  id: string;
  loanId: string;
  clientId: string;
  taskType: 'disbursement' | 'payment-due' | 'overdue' | 'prepayment' | 'completion';
  dueDate: Date;
  status: 'pending' | 'completed';
  assignedTo: string;
  completedDate?: Date;
  notes: string;
  createdAt: Date;
}

export const managementService = {
  /**
   * Create or update client profile
   */
  async createClientProfile(
    userId: string,
    profileData: Partial<ClientProfile>
  ): Promise<ClientProfile> {
    try {
      const clientProfile: ClientProfile = {
        id: userId,
        userId,
        fullName: profileData.fullName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        nationalId: profileData.nationalId || "",
        location: profileData.location || "",
        status: 'active',
        kycVerified: false,
        totalLoansRequested: 0,
        totalLoanAmount: 0,
        totalLoansApproved: 0,
        approvedAmount: 0,
        notes: "",
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...profileData,
      };

      await setDoc(doc(db, "clientProfiles", userId), {
        ...clientProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return clientProfile;
    } catch (error) {
      console.error("Error creating client profile:", error);
      throw new Error("Failed to create client profile");
    }
  },

  /**
   * Get client profile
   */
  async getClientProfile(clientId: string): Promise<ClientProfile | null> {
    try {
      const docSnap = await getDoc(doc(db, "clientProfiles", clientId));
      if (docSnap.exists()) {
        return docSnap.data() as ClientProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting client profile:", error);
      return null;
    }
  },

  /**
   * Update client profile
   */
  async updateClientProfile(
    clientId: string,
    updates: Partial<ClientProfile>
  ): Promise<void> {
    try {
      await updateDoc(doc(db, "clientProfiles", clientId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating client profile:", error);
      throw new Error("Failed to update client profile");
    }
  },

  /**
   * Create follow-up task
   */
  async createFollowUp(followUpData: Partial<ManagementFollowUp>): Promise<ManagementFollowUp> {
    try {
      const id = doc(collection(db, "followups")).id;
      const followUp: ManagementFollowUp = {
        id,
        clientId: followUpData.clientId || "",
        assignedOfficer: followUpData.assignedOfficer || "",
        type: followUpData.type || "check-in",
        subject: followUpData.subject || "",
        description: followUpData.description || "",
        status: "pending",
        scheduledDate: followUpData.scheduledDate || new Date(),
        notes: followUpData.notes || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "followups", id), {
        ...followUp,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return followUp;
    } catch (error) {
      console.error("Error creating follow-up:", error);
      throw new Error("Failed to create follow-up");
    }
  },

  /**
   * Get follow-ups for a client
   */
  async getClientFollowUps(clientId: string): Promise<ManagementFollowUp[]> {
    try {
      const q = query(
        collection(db, "followups"),
        where("clientId", "==", clientId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ManagementFollowUp);
    } catch (error) {
      console.error("Error getting client follow-ups:", error);
      return [];
    }
  },

  /**
   * Create loan follow-up task
   */
  async createLoanFollowUpTask(taskData: Partial<LoanFollowUpTask>): Promise<LoanFollowUpTask> {
    try {
      const id = doc(collection(db, "loanFollowUpTasks")).id;
      const task: LoanFollowUpTask = {
        id,
        loanId: taskData.loanId || "",
        clientId: taskData.clientId || "",
        taskType: taskData.taskType || "payment-due",
        dueDate: taskData.dueDate || new Date(),
        status: "pending",
        assignedTo: taskData.assignedTo || "",
        notes: taskData.notes || "",
        createdAt: new Date(),
      };

      await setDoc(doc(db, "loanFollowUpTasks", id), {
        ...task,
        createdAt: serverTimestamp(),
      });

      return task;
    } catch (error) {
      console.error("Error creating loan follow-up task:", error);
      throw new Error("Failed to create follow-up task");
    }
  },

  /**
   * Get pending tasks for a loan officer
   */
  async getOfficerPendingTasks(officerId: string): Promise<ManagementFollowUp[]> {
    try {
      const q = query(
        collection(db, "followups"),
        where("assignedOfficer", "==", officerId),
        where("status", "==", "pending")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ManagementFollowUp);
    } catch (error) {
      console.error("Error getting officer tasks:", error);
      return [];
    }
  },

  /**
   * Complete a follow-up task
   */
  async completeFollowUp(followUpId: string, completionNotes: string): Promise<void> {
    try {
      await updateDoc(doc(db, "followups", followUpId), {
        status: "completed",
        completedDate: serverTimestamp(),
        notes: completionNotes,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error completing follow-up:", error);
      throw new Error("Failed to complete follow-up");
    }
  },

  /**
   * Get all clients (for admin dashboard)
   */
  async getAllClients(): Promise<ClientProfile[]> {
    try {
      const q = query(collection(db, "clientProfiles"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as ClientProfile);
    } catch (error) {
      console.error("Error getting all clients:", error);
      return [];
    }
  },

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<{
    totalClients: number;
    activeClients: number;
    totalLoansProcessed: number;
    totalDisbursed: number;
    pendingFollowUps: number;
  }> {
    try {
      const clientsQuery = query(collection(db, "clientProfiles"));
      const clientsDocs = await getDocs(clientsQuery);
      const clients = clientsDocs.docs.map(doc => doc.data() as ClientProfile);

      const followUpQuery = query(
        collection(db, "followups"),
        where("status", "==", "pending")
      );
      const followUpDocs = await getDocs(followUpQuery);

      const totalClients = clients.length;
      const activeClients = clients.filter(c => c.status === 'active').length;
      const totalLoansProcessed = clients.reduce((sum, c) => sum + c.totalLoansRequested, 0);
      const totalDisbursed = clients.reduce((sum, c) => sum + c.approvedAmount, 0);
      const pendingFollowUps = followUpDocs.size;

      return {
        totalClients,
        activeClients,
        totalLoansProcessed,
        totalDisbursed,
        pendingFollowUps,
      };
    } catch (error) {
      console.error("Error getting dashboard stats:", error);
      return {
        totalClients: 0,
        activeClients: 0,
        totalLoansProcessed: 0,
        totalDisbursed: 0,
        pendingFollowUps: 0,
      };
    }
  },
};

export default managementService;
