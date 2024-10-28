import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import { useModalContext } from "../../contexts/ModalContext";

export const Layout: React.FC = () => {
  const { isModalOpen, closeModal } = useModalContext();
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Layout;
