import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Input from "./Input";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (<PopupWithForm
        name='editForm'
        title='Редактировать профиль'
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Сохранить"
        onSubmit={handleSubmit}
    >
        <Input value={name} name="name" onChange={handleNameChange} placeholder="Ваше имя" maxLength="200" minLength="2"/>
        <Input value={description} name="description" onChange={handleDescriptionChange} placeholder="О себе" maxLength="400" minLength="2"/>
    </PopupWithForm>)
}
export default EditProfilePopup;