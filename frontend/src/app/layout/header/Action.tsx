import React, { useState } from "react";
import ModalInfo from "@/app/ui/modal/ModalInfo";
import styles from './index.module.css'
import {BsInfoCircleFill  } from "react-icons/bs";

const Action: React.FC = () => {

  const [openModal, setOpenModal] = useState<null | "info" | "config">(null);

  return (
    <div className={styles.action}>
      <button className={styles.buttom} onClick={() => setOpenModal("info")}>
        <BsInfoCircleFill  />
      </button> 
      <ModalInfo isOpen={openModal === "info"} onClose={() => setOpenModal(null)}/>
    </div>
  );
};

export default Action;
