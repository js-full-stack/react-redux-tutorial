import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";
const modalRoot = document.getElementById("modal-root");

export default function Modal({ children, toggleModal }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const onCloseModal = (e) => {
      if (e.code === "Escape") {
        toggleModal();
      }
      window.addEventListener("keydown", onCloseModal);
    };
    return () => {
      window.removeEventListener("keydown", onCloseModal);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">{children}</div>
    </div>,
    modalRoot
  );
}
