/**
 * ============================================
 * USE REAL TIME NOTIFICATIONS HOOK
 * ============================================
 * Real-time notification listener using Firestore
 */

import { useEffect, useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";

/**
 * Notification types
 */
export interface Notification extends DocumentData {
  id: string;
  userId: string;
  type: "loan_status" | "payment_reminder" | "loan_approved" | "payment_received" | "general";
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
  data?: {
    loanId?: string;
    amount?: number;
    status?: string;
    [key: string]: unknown;
  };
}

export interface NotificationStats {
  total: number;
  unread: number;
  notifications: Notification[];
}

/**
 * Hook for real-time notifications
 */
export function useRealTimeNotifications() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Set up real-time listener
   */
  useEffect(() => {
    if (!user?.id) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.id)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const notifs: Notification[] = [];
          snapshot.forEach((doc) => {
            notifs.push({
              id: doc.id,
              ...doc.data(),
            } as Notification);
          });

          // Sort by newest first
          notifs.sort(
            (a, b) =>
              b.createdAt.toMillis() - a.createdAt.toMillis()
          );

          setNotifications(notifs);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching notifications:", err);
          setError("Failed to load notifications");
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.error("Error setting up notifications listener:", err);
      setError("Failed to set up notification listener");
      setLoading(false);
    }
  }, [user?.id]);

  /**
   * Get notification statistics
   */
  const stats: NotificationStats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    notifications,
  };

  /**
   * Get notifications by type
   */
  const getNotificationsByType = useCallback(
    (type: Notification["type"]) => {
      return notifications.filter((n) => n.type === type);
    },
    [notifications]
  );

  /**
   * Get unread notifications
   */
  const unreadNotifications = notifications.filter((n) => !n.read);

  /**
   * Get notifications by status
   */
  const getNotificationsByStatus = useCallback(
    (read: boolean) => {
      return notifications.filter((n) => n.read === read);
    },
    [notifications]
  );

  return {
    notifications,
    loading,
    error,
    stats,
    unreadNotifications,
    getNotificationsByType,
    getNotificationsByStatus,
  };
}

export default useRealTimeNotifications;
