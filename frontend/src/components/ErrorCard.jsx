import React from "react";
import "./ErrorCard.css";
import { FiAlertCircle } from "react-icons/fi";

function ErrorCard({ isOpen, onClose, errormsg }) {
    if (!isOpen) return null;

    return (
        <div className="error-popup-overlay2">
            <div className="error-popup-content2">

                <button
                    className="error-close-btn2"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="error-card2">
                    <div className="error-icon2">
                        <FiAlertCircle />
                    </div>
                    <p className="error-message2">
                        {errormsg}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ErrorCard;