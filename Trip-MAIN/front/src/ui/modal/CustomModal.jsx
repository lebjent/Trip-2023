import React from "react";
import Modal from "react-modal";
import "../../css/customModal.css";

Modal.setAppElement("#root");

function CustomModal({ isOpen, onClose, msg }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="ModalHeader">
        <h3 className="colorOcean">알림</h3>
        <button className="XButton" onClick={onClose}>
          X
        </button>
      </div>
      <div className="ModalContent">{msg}</div>
      <div className="ModalFooter">
        <button className="Close-Button" onClick={onClose}>
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default CustomModal;