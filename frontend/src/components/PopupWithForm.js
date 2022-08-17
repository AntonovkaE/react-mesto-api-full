import React from 'react';
import Popup from "./Popup"
import Form from "./Form";

function PopupWithForm({name, isOpen, onClose, title, submitButtonText, onSubmit, children}) {
    return (
        <Popup isOpen={isOpen} onClose={onClose} name={name}>
            <Form name={name} title={title} onSubmit={onSubmit} submitButtonText={submitButtonText} children={children}/>
        </Popup>
    );
}
export default PopupWithForm;