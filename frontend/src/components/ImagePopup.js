import React from 'react';
import Popup from "./Popup";

function ImagePopup({card, onClose}) {

    return (
        <Popup isOpen={card} onClose={onClose} name="openImage">
            <figure className="popup__figure">
                <img src={card && card.link} alt={card && card.name}
                     className="popup__img"/>
                <figcaption className="popup__caption">{card && card.name}</figcaption>
            </figure>
        </Popup>
    );
}

export default ImagePopup;


