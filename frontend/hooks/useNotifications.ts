import { useState, useEffect } from 'react';
import { notificationService, Notification } from '../lib/notification-service';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return unsubscribe;
  }, []);

  const dismiss = (id: string) => {
    notificationService.remove(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    notificationService.clear();
    setNotifications([]);
  };

  return {
    notifications,
    dismiss,
    clearAll,
    success: notificationService.success.bind(notificationService),
    error: notificationService.error.bind(notificationService),
    warning: notificationService.warning.bind(notificationService),
    info: notificationService.info.bind(notificationService),
  };
}
