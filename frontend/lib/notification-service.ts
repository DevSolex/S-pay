type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type NotificationListener = (notification: Notification) => void;

class NotificationService {
  private listeners: Set<NotificationListener> = new Set();
  private notifications: Notification[] = [];
  private idCounter = 0;

  subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(
    type: NotificationType,
    title: string,
    message: string,
    options?: { duration?: number; action?: Notification['action'] }
  ): string {
    const notification: Notification = {
      id: `notification-${++this.idCounter}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      duration: options?.duration,
      action: options?.action,
    };

    this.notifications.push(notification);
    this.listeners.forEach(listener => listener(notification));

    if (notification.duration) {
      setTimeout(() => this.remove(notification.id), notification.duration);
    }

    return notification.id;
  }

  success(title: string, message: string, options?: { duration?: number }): string {
    return this.notify('success', title, message, { duration: options?.duration || 5000 });
  }

  error(title: string, message: string, options?: { duration?: number }): string {
    return this.notify('error', title, message, { duration: options?.duration || 7000 });
  }

  warning(title: string, message: string, options?: { duration?: number }): string {
    return this.notify('warning', title, message, { duration: options?.duration || 6000 });
  }

  info(title: string, message: string, options?: { duration?: number }): string {
    return this.notify('info', title, message, { duration: options?.duration || 4000 });
  }

  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clear(): void {
    this.notifications = [];
  }

  getAll(): Notification[] {
    return [...this.notifications];
  }
}

export const notificationService = new NotificationService();
