import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import '../App.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Login from "./Login";
import Register from "./Register";
import * as auth from '../utils/auth.js';
import InfoTooltip from "./InfoTooltip";
import PrivateRoute from "./ProtectedRoute";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [deleteCard, setDeleteCard] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [registerResStatus, setRegisterResStatus] = useState(400)
    const navigate = useNavigate()
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
    const handleCartClick = (card) => {
        setDeleteCard(card)
        setIsConfirmationPopupOpen(!isConfirmationPopupOpen)
    }
    const handleSignInSubmit = (email, password) => {
        setUserEmail(email)
        setLoggedIn(true)
        auth.authorize(password, email)
            .then(data => {
                if (data.token) {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }
    const handleSignUpSubmit = (password, email) => {
        setIsInfoTooltipOpen(true)
        auth.register(password, email)
            .then(res => {
                setRegisterResStatus(res.statusCode);
                if (res.statusCode !== 400) {
                    navigate('/sign-in');
                } else {
                    console.log(`код ошибки ${res.status}`)
                }
            })
            .catch(err => console.log(err))
    }
    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsConfirmationPopupOpen(false)
        setSelectedCard(null)
        setIsInfoTooltipOpen(false)
    }

    const handleUpdateUser = ({name, about}) => {
        api.saveUserData(name, about)
            .then(uploadUserData)
            .catch(res => console.log(res))
    }
    const uploadUserData = (userData) => {
        setCurrentUser(userData);
        closeAllPopups()
        return userData
    }

    const handleUpdateAvatar = (link) => {
        api.changeAvatar(link)
            .then(uploadUserData)
            .catch(res => console.log(res))
    }

    const handleAddPlace = ({name, link}) => {
        api.saveNewCard(name, link)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
                return newCard
            })
            .catch(res => console.log(res))
    }
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(res => console.log(res));
    }
    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then((res) => {
                setCards((state) => state.filter(c => c._id !== card._id))
                closeAllPopups()
            })
            .catch(res => console.log(res));
    }
    useEffect(() => {
        api.getUserData()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(res => console.log(res));
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then(cards => {
                setCards(cards.map(item => ({
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    _id: item._id,
                    owner: item.owner,
                })))
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    const setResStatus = () => {
        setRegisterResStatus(400)
    }

    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    setUserEmail(res.data.email)
                    if (res) {
                        setLoggedIn(true)
                        navigate('/')
                    }
                })
                .catch(res => console.log(res))
        }
    }
    useEffect(() => {
        handleTokenCheck()
        setRegisterResStatus(400)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Header email={userEmail} onLogout={handleLogout} loggedIn={loggedIn}/>
                    <Routes>
                        <Route path="/" element={<PrivateRoute loggedIn={loggedIn}><Main
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditProfile={handleEditProfileClick}
                            onClose={closeAllPopups}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCartClick}
                        /></PrivateRoute>}/>
                        <Route path='/sign-in' element={<Login onSubmit={handleSignInSubmit}/>}>
                        </Route>
                        <Route path='/sign-up' element={<Register onSubmit={handleSignUpSubmit} setResStatus={setResStatus}/>}>
                        </Route>
                        <Route exact path="*"
                               element={loggedIn ? (<Navigate replace to="/"/>) : (
                                   <Navigate replace to="/sign-up"/>)}
                        />
                    </Routes>
                    <Footer/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
                    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups}/>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <ConfirmationPopup
                        isOpen={isConfirmationPopupOpen}
                        onClose={closeAllPopups}
                        card={deleteCard}
                        onSubmit={handleCardDelete}
                    />
                    <InfoTooltip isOpen={isInfoTooltipOpen}
                                 onClose={closeAllPopups}
                                 resStatus={registerResStatus}
                                 setResStatus={setResStatus}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
