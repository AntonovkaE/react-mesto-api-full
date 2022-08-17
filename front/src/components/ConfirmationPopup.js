import PopupWithForm from "./PopupWithForm";

import React from 'react';

function ConfirmationPopup({card, onSubmit, isOpen, onClose}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(card)
    }
    return (<PopupWithForm
            name='deleteCard'
            title='Вы уверены?'
            isOpen={isOpen}
            onClose={onClose}
            submitButtonText="Да"
            onSubmit={handleSubmit}
        />
    );
}

export default ConfirmationPopup;