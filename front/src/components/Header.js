import logo from "../img/logo.svg";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from 'react';


function Header({email, onLogout, loggedIn}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isBurgerHidden, setIsBurgerHidden] = useState(false)
    const [isMenuVisible, setIsMenuVisible] = useState(true)
    const activeClassName = 'link header__auth';
    const hidden = 'hidden';

    const showMenu = () => {
        setIsBurgerHidden(true);
        setIsMenuVisible(true);
        setIsMenuOpen(true)
    }
    useEffect(() => {
        function closeByClick() {
            setIsMenuOpen(false)
            setIsBurgerHidden(false)
        }

        if (isMenuOpen) {
            document.querySelector("main").addEventListener('click', closeByClick);
            return () => {
                document.querySelector("main").removeEventListener('click', closeByClick);
            }
        }
    }, [isMenuOpen])

    useEffect(() => {
        if (loggedIn) {
            if (isMenuOpen) {
                setIsBurgerHidden(true)
            } else {
                setIsBurgerHidden(false)
            }
            setIsMenuVisible(false)
        } else {
            setIsBurgerHidden(true)
            setIsMenuVisible(true)
            setIsMenuOpen(false)
        }
    }, [loggedIn, isMenuOpen])

    return (
        <header className={`header ${isMenuOpen ? "header_center" : ""}`}>
            <img src={logo} alt="место" className={`header__logo ${isMenuOpen ? "header__logo_hidden" : ""}`}/>
            <div onClick={showMenu}
                 className={`header__burger ${isBurgerHidden ? "header__burger_hidden" : ''}  burger`}>
                <div className="burger__line burger__line_first"></div>
                <div className="burger__line burger__line_second"></div>
                <div className="burger__line burger__line_third"></div>
            </div>
            <div
                className={`header__menu ${(isMenuVisible && !isMenuOpen) ? "" : "header__menu_hidden"} ${isMenuOpen ? "header__menu_open" : ""}`}>
                <p className="header__email">{loggedIn ? email : ''}</p>
                <nav>
                    <ul className="list">
                        <li>
                            <NavLink
                                to="/sign-up"
                                className={({isActive}) =>
                                    (!isActive && !loggedIn) ? activeClassName : hidden
                                }
                            >
                                Регистрация
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-in"
                                className={({isActive}) =>
                                    (!isActive && !loggedIn) ? activeClassName : hidden
                                }
                            >
                                Войти
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-in"
                                className={
                                    loggedIn ? activeClassName : hidden
                                }
                                onClick={onLogout}
                            >
                                Выйти
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

