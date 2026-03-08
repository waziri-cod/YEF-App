/**
 * Firestore Service - Complete CRUD operations for all collections
 */

import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ClientLoan, LoanPackage, PaymentSchedule } from "@/data/loanPackages";
import { MarketplaceItem } from "@/data/marketplace";

/**
 * Loan Operations
 */
export const loanService = {
  /**
   * Create a new loan application
   */
  async createLoanApplication(
    clientId: string,
    packageId: string,
    amount: number,
    documents: string[]
  ): Promise<string> {
    try {
      const loanRef = await addDoc(collection(db, "clientLoans"), {
        clientId,
        packageId,
        amount,
        status: "pending",
        documents,
        requestDate: serverTimestamp(),
        interestRate: 0,
        monthlyPayment: 0,
        totalRepayment: 0,
        amountPaid: 0,
        remainingBalance: amount,
        notes: "Loan application submitted",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return loanRef.id;
    } catch (error) {
      console.error("Error creating loan application:", error);
      throw new Error("Failed to create loan application");
    }
  },

  /**
   * Get loan by ID
   */
  async getLoan(loanId: string): Promise<ClientLoan | null> {
    try {
      const docSnap = await getDoc(doc(db, "clientLoans", loanId));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ClientLoan;
      }
      return null;
    } catch (error) {
      console.error("Error getting loan:", error);
      return null;
    }
  },

  /**
   * Get all loans for a client
   */
  async getClientLoans(clientId: string): Promise<ClientLoan[]> {
    try {
      const q = query(
        collection(db, "clientLoans"),
        where("clientId", "==", clientId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientLoan));
    } catch (error) {
      console.error("Error getting client loans:", error);
      return [];
    }
  },

  /**
   * Update loan status
   */
  async updateLoanStatus(
    loanId: string,
    status: "pending" | "approved" | "rejected" | "disbursed" | "completed" | "defaulted",
    notes?: string
  ): Promise<void> {
    try {
      const updates: DocumentData = {
        status,
        updatedAt: serverTimestamp(),
      };

      if (notes) {
        updates.notes = notes;
      }

      if (status === "approved") {
        updates.approvalDate = serverTimestamp();
      }

      if (status === "disbursed") {
        updates.disbursementDate = serverTimestamp();
      }

      await updateDoc(doc(db, "clientLoans", loanId), updates);
    } catch (error) {
      console.error("Error updating loan status:", error);
      throw new Error("Failed to update loan status");
    }
  },

  /**
   * Record a payment
   */
  async recordPayment(
    loanId: string,
    amount: number,
    paymentMethod: string
  ): Promise<void> {
    try {
      const loanDoc = await getDoc(doc(db, "clientLoans", loanId));
      if (!loanDoc.exists()) {
        throw new Error("Loan not found");
      }

      const loanData = loanDoc.data();
      const newAmountPaid = (loanData.amountPaid || 0) + amount;
      const newBalance = loanData.remainingBalance - amount;

      await updateDoc(doc(db, "clientLoans", loanId), {
        amountPaid: newAmountPaid,
        remainingBalance: Math.max(0, newBalance),
        updatedAt: serverTimestamp(),
      });

      // Add payment record
      await addDoc(collection(db, "paymentRecords"), {
        loanId,
        amount,
        paymentMethod,
        status: "completed",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error recording payment:", error);
      throw new Error("Failed to record payment");
    }
  },

  /**
   * Get payment history for a loan
   */
  async getPaymentHistory(loanId: string): Promise<DocumentData[]> {
    try {
      const q = query(
        collection(db, "paymentRecords"),
        where("loanId", "==", loanId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting payment history:", error);
      return [];
    }
  },
};

/**
 * Marketplace Operations
 */
export const marketplaceService = {
  /**
   * Create marketplace item
   */
  async createListItem(
    clientId: string,
    itemData: Partial<MarketplaceItem>
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "marketplaceItems"), {
        clientId,
        ...itemData,
        rating: 0,
        reviews: 0,
        views: 0,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error creating marketplace item:", error);
      throw new Error("Failed to create listing");
    }
  },

  /**
   * Get marketplace item
   */
  async getItem(itemId: string): Promise<MarketplaceItem | null> {
    try {
      const docSnap = await getDoc(doc(db, "marketplaceItems", itemId));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MarketplaceItem;
      }
      return null;
    } catch (error) {
      console.error("Error getting marketplace item:", error);
      return null;
    }
  },

  /**
   * Search marketplace items
   */
  async searchItems(
    searchTerm: string,
    category?: string,
    limit_count: number = 20
  ): Promise<MarketplaceItem[]> {
    try {
      const constraints: QueryConstraint[] = [
        where("status", "==", "active"),
      ];

      if (category) {
        constraints.push(where("category", "==", category));
      }

      constraints.push(limit(limit_count));

      const q = query(
        collection(db, "marketplaceItems"),
        ...constraints
      );

      const querySnapshot = await getDocs(q);
      let results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as MarketplaceItem));

      // Client-side filtering by search term
      if (searchTerm) {
        results = results.filter(
          item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some(tag =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }

      return results;
    } catch (error) {
      console.error("Error searching marketplace items:", error);
      return [];
    }
  },

  /**
   * Update item views
   */
  async incrementViews(itemId: string): Promise<void> {
    try {
      const itemDoc = await getDoc(doc(db, "marketplaceItems", itemId));
      if (itemDoc.exists()) {
        const currentViews = itemDoc.data().views || 0;
        await updateDoc(doc(db, "marketplaceItems", itemId), {
          views: currentViews + 1,
        });
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  },

  /**
   * Add review to item
   */
  async addReview(
    itemId: string,
    reviewerId: string,
    rating: number,
    comment: string
  ): Promise<void> {
    try {
      await addDoc(collection(db, "marketplaceReviews"), {
        itemId,
        reviewerId,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      // Update item rating
      const reviews = await getDocs(
        query(
          collection(db, "marketplaceReviews"),
          where("itemId", "==", itemId)
        )
      );

      const totalRating = reviews.docs.reduce((sum, doc) => {
        return sum + (doc.data().rating || 0);
      }, 0);

      const averageRating = totalRating / reviews.docs.length;

      await updateDoc(doc(db, "marketplaceItems", itemId), {
        rating: averageRating,
        reviews: reviews.docs.length,
      });
    } catch (error) {
      console.error("Error adding review:", error);
      throw new Error("Failed to add review");
    }
  },

  /**
   * Get reviews for item
   */
  async getItemReviews(itemId: string): Promise<DocumentData[]> {
    try {
      const q = query(
        collection(db, "marketplaceReviews"),
        where("itemId", "==", itemId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting reviews:", error);
      return [];
    }
  },
};

/**
 * Notification Operations
 */
export const notificationService = {
  /**
   * Create notification
   */
  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: DocumentData
  ): Promise<void> {
    try {
      await addDoc(collection(db, "notifications"), {
        userId,
        type,
        title,
        message,
        data: data || {},
        read: false,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  },

  /**
   * Get user notifications
   */
  async getUserNotifications(
    userId: string,
    unreadOnly: boolean = false
  ): Promise<DocumentData[]> {
    try {
      const constraints: QueryConstraint[] = [
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(50),
      ];

      if (unreadOnly) {
        constraints.splice(1, 0, where("read", "==", false));
      }

      const q = query(collection(db, "notifications"), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting notifications:", error);
      return [];
    }
  },

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await updateDoc(doc(db, "notifications", notificationId), {
        read: true,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "notifications", notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },
};

/**
 * Success Stories Operations
 */
export const successStoryService = {
  /**
   * Create success story
   */
  async createSuccessStory(
    clientId: string,
    loanId: string,
    title: string,
    story: string,
    image?: string
  ): Promise<void> {
    try {
      await addDoc(collection(db, "successStories"), {
        clientId,
        loanId,
        title,
        story,
        image,
        featured: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating success story:", error);
      throw new Error("Failed to create success story");
    }
  },

  /**
   * Get all success stories
   */
  async getAllSuccessStories(featured: boolean = false): Promise<DocumentData[]> {
    try {
      const constraints: QueryConstraint[] = [
        orderBy("createdAt", "desc"),
        limit(50),
      ];

      if (featured) {
        constraints.unshift(where("featured", "==", true));
      }

      const q = query(collection(db, "successStories"), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting success stories:", error);
      return [];
    }
  },

  /**
   * Get client success stories
   */
  async getClientSuccessStories(clientId: string): Promise<DocumentData[]> {
    try {
      const q = query(
        collection(db, "successStories"),
        where("clientId", "==", clientId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting client success stories:", error);
      return [];
    }
  },
};

export default {
  loanService,
  marketplaceService,
  notificationService,
  successStoryService,
};
