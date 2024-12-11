import { AuthForm } from '../AuthForm/AuthForm';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains('modal-wrapper')) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-wrapper ${isOpen ? '' : 'hidden'}`}
      onClick={handleOutsideClick}
    >
      <div className="modal-content">
        <button className="modal-button" onClick={onClose}></button>
        <AuthForm onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
