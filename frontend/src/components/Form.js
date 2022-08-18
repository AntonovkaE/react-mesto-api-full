import React from 'react';

function Form({title, onSubmit, name, submitButtonText, children}) {
    return (
            <div className={`form form_${name}`}>
                <h2 className={`form__heading form__heading_${name}`}>{title}</h2>
                <form onSubmit={onSubmit} className="popup__form form__content" name={name}>
                    {children}
                    <button type="submit" className={`button form__submit form__submit_${name}`} aria-label="Создать"
                            name="formSubmit">
                        {submitButtonText}
                    </button>
                </form>
            </div>
    )
}

export default Form;