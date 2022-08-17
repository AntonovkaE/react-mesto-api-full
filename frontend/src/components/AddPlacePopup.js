import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect} from 'react';
import Input from "./Input";

function AppPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')


    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }
    useEffect(() => {
        setName('');
        setLink('')
    }, [isOpen])


    return (<PopupWithForm
        name='addCard'
        title='Новое место'
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Создать"
        onSubmit={handleSubmit}
    >
        <Input value={name} name="place" onChange={handleNameChange} placeholder="Название" maxLength="30" minLength="2"/>
        <Input value={link} name="url" onChange={handleLinkChange} type="url" placeholder="Ссылка на картинку" maxLength="400" minLength="2"/>
        {/*</label>*/}
    </PopupWithForm>)
}

export default AppPlacePopup;