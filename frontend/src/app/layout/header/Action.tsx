import React from "react";
import styles from './index.module.css'
import { BsGear, BsInfoCircle } from "react-icons/bs";

const Action: React.FC = () => {
  return (
    <div className={styles.action}>
      <button className={styles.buttom}>
        <BsInfoCircle />
      </button>

      <button className={styles.buttom}>
        <BsGear />
      </button>
    </div>
  );
};

export default Action;
