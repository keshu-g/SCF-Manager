const Modal = ({ id, title, children, onClose }) => {
    return (
      <>
        <input type="checkbox" id={id} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor={id}
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <div>{children}</div>
          </div>
        </div>
      </>
    );
  };
  
  export default Modal;
  