/**
 * ============================================
 * NOTIFICATIONS PANEL COMPONENT
 * ============================================
 * Display real-time notifications with filtering
 */

import { useState } from "react";
import { Bell, X, Check, Trash2, AlertCircle, CheckCircle, DollarSign, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRealTimeNotifications, Notification } from "@/hooks/useRealTimeNotifications";
import { notificationService } from "@/services/firestoreService";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Timestamp } from "firebase/firestore";

/**
 * Notification Item Component
 */
function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "loan_approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "payment_reminder":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "payment_received":
        return <DollarSign className="h-4 w-4 text-blue-500" />;
      case "loan_status":
        return <ClipboardList className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: Timestamp | Date | unknown) => {
    let date: Date;
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date();
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-all hover:bg-accent/50",
        notification.read
          ? "bg-background border-border"
          : "bg-primary/5 border-primary/20"
      )}
    >
      <div className="mt-1">{getIcon(notification.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(notification.createdAt)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        {notification.data?.amount && (
          <p className="text-xs font-semibold text-primary mt-1">
            {notification.data.amount.toLocaleString()} TZS
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            title="Mark as read"
            className="h-8 w-8 p-0"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(notification.id)}
          title="Delete"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Notifications Panel Component
 */
export function NotificationsPanel() {
  const { notifications, stats, loading } = useRealTimeNotifications();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Mark notification as read
   */
  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markNotificationAsRead(id);
      toast({
        title: "Marked as read",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  /**
   * Delete notification
   */
  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      toast({
        title: "Notification deleted",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  /**
   * Mark all as read
   */
  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        stats.unreadNotifications.map((n) =>
          notificationService.markNotificationAsRead(n.id)
        )
      );
      toast({
        title: "All marked as read",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark all as read",
        variant: "destructive",
      });
    }
  };

  const loanNotifications = notifications.filter(
    (n) => n.type === "loan_status" || n.type === "loan_approved"
  );
  const paymentNotifications = notifications.filter(
    (n) => n.type === "payment_reminder" || n.type === "payment_received"
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {stats.unread > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {stats.unread > 99 ? "99+" : stats.unread}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              {stats.unread} new notification{stats.unread !== 1 ? "s" : ""}
            </p>
          </div>
          {stats.unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">
            <div className="inline-block animate-spin">
              <Bell className="h-5 w-5" />
            </div>
            <p className="mt-2">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto opacity-50 mb-2" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-4 mx-4 mt-3">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="loans" className="text-xs">
                Loans
              </TabsTrigger>
              <TabsTrigger value="payments" className="text-xs">
                Payments
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
              </TabsTrigger>
            </TabsList>

            {/* All Notifications Tab */}
            <TabsContent value="all" className="flex-1 overflow-y-auto space-y-2 px-4 py-3">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans" className="flex-1 overflow-y-auto space-y-2 px-4 py-3">
              {loanNotifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No loan notifications
                </div>
              ) : (
                loanNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="flex-1 overflow-y-auto space-y-2 px-4 py-3">
              {paymentNotifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No payment notifications
                </div>
              ) : (
                paymentNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabsContent>

            {/* Unread Tab */}
            <TabsContent value="unread" className="flex-1 overflow-y-auto space-y-2 px-4 py-3">
              {stats.unreadNotifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No unread notifications
                </div>
              ) : (
                stats.unreadNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}

        <DropdownMenuSeparator className="my-0" />

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 text-center">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationsPanel;
