import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end">
          <Button
            text="Close"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Modal;
