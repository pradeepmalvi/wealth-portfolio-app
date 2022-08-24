import React from "react";
import Modal from "react-modal";
import InputForm from "../components/InputForm";

const customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export default function AddExpenseModal({ modalIsOpen, onClose, getSummary }) {
  // Modal.setAppElement("#yourAppElement");

  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    onClose();
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between mb-5">
            <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
              Add Expense
            </h5>
            <button className="text-black-100" onClick={closeModal}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <InputForm
            type={"expense"}
            onClose={onClose}
            getSummary={getSummary}
          />
        </div>
      </Modal>
    </div>
  );
}
