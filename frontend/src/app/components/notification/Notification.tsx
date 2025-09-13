"use client";

import { useEffect } from "react";
import {
  BsExclamationTriangle,
  BsCheck2Square,
  BsExclamationOctagon,
  BsInfoCircle,
} from "react-icons/bs";
import styles from "./notification.module.css";

type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

export default function Notification({
  message,
  type,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  function getIcon(type: NotificationProps["type"]) {
    switch (type) {
      case "success":
        return <BsCheck2Square />;
      case "error":
        return <BsExclamationOctagon />;
      case "warning":
        return <BsExclamationTriangle />;
      case "info":
        return <BsInfoCircle />;
      default:
        return null;
    }
  }

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.notificationIcon}>
        <span>{getIcon(type)}</span>

        <p>{message}</p>
      </div>

      <button onClick={onClose}>x</button>
    </div>
  );
}
