import { ReactNode, createContext, useState } from "react";

import Notifier from "../../components/resuable/Notifier";
import Notification from "../../types/Notification";

type NotifierContextValue = {
  notify: (notification: Notification) => void;
};

export const NotifierContext = createContext<NotifierContextValue>({
  notify: () => {}
});

type NotifierProviderProps = {
  children: ReactNode;
};

export default function NotifierProvider({ children }: NotifierProviderProps) {
  const timeout = 3000; // 3 seconds

  const [notification, setNotification] = useState<Notification | null>(null);
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);

  function handleExistingTimeout() {
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }
  }

  function notify(notification: Notification) {
    handleExistingTimeout();

    setNotification(notification);
    setTimeoutID(
      setTimeout(() => {
        setNotification(null);
        setTimeoutID(null);
      }, timeout)
    );
  }

  function close() {
    handleExistingTimeout();

    setNotification(null);
    setTimeoutID(null);
  }

  return (
    <NotifierContext.Provider value={{ notify }}>
      {notification && (
        <Notifier
          notification={notification}
          timeout={timeout}
          onClose={close}
        />
      )}
      {children}
    </NotifierContext.Provider>
  );
}
