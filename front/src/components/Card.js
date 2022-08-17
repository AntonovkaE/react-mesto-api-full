import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    function handleClick() {
        onCardClick(card);
    }
    function handleLike() {
        onCardLike(card);
    }
    function handleDelete() {
        onCardDelete(card)
    }
    const currentUser = useContext(CurrentUserContext)
    const isOwn = (card.owner._id === currentUser._id)
    const cardDeleteButtonClassName = (
        `card__button card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__button card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button_inactive'} `);
    return (
        <li  className="cards__item card">
            <button onClick={handleDelete} type="button"  className={cardDeleteButtonClassName}></button>
            <img onClick={handleClick} src={card.link} alt={card.name} className="card__img"/>
            <div className="card__body">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-area">
                    <button onClick={handleLike} className={cardLikeButtonClassName}></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}
export default Card;

