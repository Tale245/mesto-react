import logo from "../images/header__logo.svg";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import PopupWithImage from "./ImagePopup/ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  function handleCardClick(link) {
    setSelectedCard(link);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
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
        children={
          <>
            <input
              type="text"
              name="name"
              class="popup__field popup__field_name"
              id="name"
              minlength="2"
              maxlength="40"
              required
            />
            <span
              class="name-error popup__field-error span-error"
              id="name-error"
            ></span>
            <input
              type="text"
              name="job"
              class="popup__field popup__field_job"
              id="job"
              minlength="2"
              maxlength="200"
              required
            />
            <span
              class="job-error popup__field-error span-error"
              id="job-error"
            ></span>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        popupName="add-item"
        title="Новое место"
        submitBtnName="Создать"
        children={
          <>
            <input
              type="text"
              name="name"
              class="popup__field popup__field_title-image"
              id="title"
              placeholder="Название"
              minlength="2"
              maxlength="30"
              required
            />
            <span class="title-error popup__field-error"></span>
            <input
              type="url"
              name="link"
              class="popup__field popup__field_image"
              id="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span class="url-error popup__field-error" id="url-error"></span>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>

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
        children={
          <>
            <input
              class="popup__field popup__field_change-avatar"
              type="url"
              id="avatarLink"
              placeholder="Ссылка на аватар"
              name="avatar"
              required
            />
            <span
              class="avatarLink-error popup__field-error span-error"
              id="avatarLink-error"
            ></span>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
