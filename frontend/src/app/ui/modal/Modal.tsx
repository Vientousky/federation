import { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleOverlayClick} className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {title && <h2>{title}</h2>}
        {children}
        <button onClick={onClose}>cerrar</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
