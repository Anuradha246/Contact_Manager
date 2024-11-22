// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ message, onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
