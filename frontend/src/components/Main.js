import editProfileIcon from '../img/editProfile.svg';
import avatar from '../img/image.jpg';
import editIcon from '../img/edit.svg';
import addIcon from '../img/add_button.svg';
import React from 'react';
import {useContext} from 'react'
import Card from './Card'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardDelete, onCardLike}) {

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="page__main">
            <section className="profile">
                <button onClick={onEditAvatar} className="button profile__button profile__button_type_change-avatar">
                    <img src={editProfileIcon} alt="иконка редактирования профиля" className="profile__icon profile__icon_type_edit-avatar"/>
                    <img src={currentUser.avatar ? currentUser.avatar : avatar} alt="фото пользователя" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <div className="profile__name-block">
                        <h1 className="profile__name">{currentUser.name} </h1>
                        <button onClick={onEditProfile} className="button profile__button profile__button_type_edit">
                            <img className="profile__icon profile__icon_type_edit" src={editIcon}
                                 alt="иконка редактирование"/>
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="button profile__button profile__button_type_add">
                    <img className="profile__icon profile__icon_type_add" src={addIcon} alt="плюс"/>
                </button>
            </section>
            <section className="gallery" aria-label="Фото мест">
                <ul className="cards">
                    {cards.map((card, i) => (
                        <Card onCardDelete={onCardDelete} onCardLike={onCardLike} key={card._id} card={card} onCardClick={onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;

