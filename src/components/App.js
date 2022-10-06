import logo from "../images/header__logo.svg";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { CurrentCardContext } from "../contexts/CurrentCardContext";
import api from "../utils/Api";
import { EditProfilePopup } from "./EditProfilePopup/EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup/EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup/AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ card: false });
  const [currentUser, setCurrentUser] = React.useState({});
  // const [currentCard, setCurrentCard] = React.useState([])

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((e) => console.log(e));

    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e));
  });


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked);
  }

  function handleCardDelete(card) {
    api.deleteCard(card).then(() => {
      setCards(cards.filter((item) => item._id !== card._id));
    });
  }

  function handleCardClick({ link, name }) {
    setSelectedCard({ card: true, link: link, name: name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ card: false });
  }

  function handleAddPlaceSubmit(card, nameRef, linkRef) {
    debugger
    api
      .uploadCard(card)
      .then((card) => {
        setCards([card, ...cards]);
      }).then(() => closeAllPopups()).then(() => {
        nameRef.current.value = ''
        linkRef.current.value = ''
      })
      .catch((e) => console.log(e));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((result) => {
        setCurrentUser(result);
      })
      .then(() => closeAllPopups());
  }

  function handleUpdateAvatar({ avatar }, avatarRef) {
    api
      .changeAvatar({ avatar })
      .then((result) => {
        setCurrentUser(result);
      })
      .then(() => closeAllPopups()).then(() => avatarRef.current.value = '')
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {/* <CurrentCardContext.Provider value={currentCard}> */}
        <Header logo={logo} />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} uploadCard = {handleAddPlaceSubmit} />

        <PopupWithForm
          popupName="confirm"
          title="Вы уверены?"
          submitBtnName="Да"
          isOpen={false}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* </CurrentCardContext.Provider> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
