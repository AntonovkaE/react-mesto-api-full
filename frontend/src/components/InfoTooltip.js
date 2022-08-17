import Popup from "./Popup";
import success from "../img/Union.png";
import error from "../img/Union-2.png"
import React, {useEffect, useState} from 'react';

function InfoTooltip({isOpen, onClose, resStatus}) {
    const [title, setTitle] = useState('')
    const [iconSrc, setIconSrc] = useState('')
    useEffect(() => {
        if (resStatus !== 400) {
            setTitle('Вы успешно зарегистрировались!')
            setIconSrc(success)
        } else {
            setTitle('Что-то пошло не так!\n' +
                'Попробуйте ещё раз.')
            setIconSrc(error)
        }
    }, [resStatus])

    return (<Popup
            name='infoTooltip'
            isOpen={isOpen}
            onClose={onClose}
        >
            <img src={iconSrc} alt="success" className="popup__notification"/>
            <h2 className="popup__heading popup__heading_infoTooltip">{title}</h2>

        </Popup>
    );
}

export default InfoTooltip;