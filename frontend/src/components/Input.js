import React from 'react';


function Input({value='', name, onChange = () => {}, placeholder, maxLength, minLength, type="text", mode="light"}) {
    return (
        <label htmlFor={`${name}-input`} className="form__label">
            <input value={value || ''} onChange={onChange} type={type} name={`${name}Input`} id={`${name}-input`}
                   className={`form__item form__item_el_${name} form__item_${mode}`}
                   placeholder={placeholder} maxLength={maxLength} minLength={minLength} autoComplete="on" required/>
            <span className="form__item-error name-input-error"/>
        </label>)
}

export default Input;

