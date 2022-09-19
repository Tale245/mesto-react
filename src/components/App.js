import logo from "../images/header__logo.svg";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ card: false });

  function handleCardClick({ link, name }) {
    setSelectedCard({ card: true, link: link, name: name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ card: false });
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

  return (
    <div className="page">
      <Header logo={logo} />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        popupName="edit-info"
        title="Редактировать профиль"
        submitBtnName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          className="popup__field popup__field_name"
          id="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className="name-error popup__field-error span-error"
          id="name-error"
        ></span>
        <input
          type="text"
          name="job"
          className="popup__field popup__field_job"
          id="job"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className="job-error popup__field-error span-error"
          id="job-error"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        popupName="add-item"
        title="Новое место"
        submitBtnName="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          className="popup__field popup__field_title-image"
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="title-error popup__field-error"></span>
        <input
          type="url"
          name="link"
          className="popup__field popup__field_image"
          id="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="url-error popup__field-error" id="url-error"></span>
      </PopupWithForm>

      <PopupWithForm
        popupName="confirm"
        title="Вы уверены?"
        submitBtnName="Да"
        isOpen={false}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        popupName="change-avatar"
        title="Изменить аватар"
        submitBtnName="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__field popup__field_change-avatar"
          type="url"
          id="avatarLink"
          placeholder="Ссылка на аватар"
          name="avatar"
          required
        />
        <span
          className="avatarLink-error popup__field-error span-error"
          id="avatarLink-error"
        ></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
