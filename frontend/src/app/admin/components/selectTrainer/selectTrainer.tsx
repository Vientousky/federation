"use client";

import { useState } from "react";
import { TrainerInfo } from "@/app/lib/Entrenador";
import Entrenador from "@/app/components/entrenador/CardEntrenador";
import ModalTrainer from "../../../ui/modal/ModalTrainers";
import styles from "../../boxeador/boxerForm.module.css";

interface SelectTrainerProps {
  value: TrainerInfo | null;
  onChange: (trainer: TrainerInfo) => void;
}

export default function SelectTrainer({ value, onChange }: SelectTrainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (trainer: TrainerInfo) => {
    onChange(trainer);
    setIsModalOpen(false);
  };

  return (
    <>
      {value ? (
        <div
          onClick={() => setIsModalOpen(true)}
          className={styles.boxerTrainerSelect}
        >
          <Entrenador trainer={value}/>
        </div>
      ) : (
        <div
          onClick={() => setIsModalOpen(true)}
          className={styles.boxerTrainer}
        >
          <h1>+</h1>
          <p>selecione un entrenador</p>
        </div>
      )}

      <ModalTrainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect} // solo llamamos a handleSelect
      />
    </>
  );
}
