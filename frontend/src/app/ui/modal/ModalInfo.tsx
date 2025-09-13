import Modal from "./Modal";

type ModalInfoProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalInfo({ isOpen, onClose }: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Información">
      <p>Detalles importantes sobre el boxeador.</p>
    </Modal>
  );
}