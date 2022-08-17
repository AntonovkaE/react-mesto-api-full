import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from 'react';

function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarLink = React.useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar(avatarLink.current.value);
    }

    useEffect(() => {
        avatarLink.current.value = ''
    }, [isOpen])

    return (<PopupWithForm name='changeAvatar'
                           title='Обновить аватар'
                           isOpen={isOpen}
                           onClose={onClose}
                           submitButtonText="Сохранить"
                           onSubmit={handleSubmit}
    >
        <label htmlFor="place-input" className="form__label">
            <input ref={avatarLink}
                   type="url" name="avatarInput" id="avatar-input"
                   className="form__item form__item_el_avatar" placeholder="Ссылка на аватар"
                   minLength={2} required/>
            <span className="form__item-error avatar-input-error"/>
        </label>
        {/*<Input name="avatar" ref={avatarLink} placeholder="Ссылка на аватар" maxLength="400" minLength="2"/>*/}
    </PopupWithForm>)
}

export default EditProfilePopup;
