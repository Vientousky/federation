import React from "react";
import styles from './index.module.css'
import { BsGearFill , BsInfoCircleFill  } from "react-icons/bs";

const Action: React.FC = () => {
  return (
    <div className={styles.action}>
      <button className={styles.buttom}>
        <BsInfoCircleFill  />
      </button>

      <button className={styles.buttom}>
        <BsGearFill/>
      </button>
    </div>
  );
};

export default Action;
