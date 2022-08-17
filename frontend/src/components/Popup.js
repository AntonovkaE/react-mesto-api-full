import React from "react";
import { useEffect } from "react";
import closeIcon from '../img/CloseIcon.svg';


const Popup = ({ isOpen, name, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    return (
        <div
            className={`popup ${isOpen ? "popup_open" : ""} popup_${name}`}
            onClick={handleOverlay}
        >
            <div className={`popup__container popup__container_${name}`}>
                <button onClick={onClose} type="button" className="button popup__button popup__button_type_close close-area" aria-label="Close" data-close>
                    <img className="popup__icon popup__icon_type_close close-area" src={closeIcon} alt="крестик" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;


