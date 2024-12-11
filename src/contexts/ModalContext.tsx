import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  FC,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogged } = useAuth();
  const openModal = () => setIsModalOpen(true);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isLogged) {
      closeModal();
    }
  }, [isLogged, closeModal]);

  useEffect(() => {
    console.log('ModalProvider: isModalOpen обновился на:', isModalOpen);
  }, [isModalOpen]);
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
