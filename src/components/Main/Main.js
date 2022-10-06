import React from "react";
// import { CurrentCardContext } from "../../contexts/CurrentCardContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Cards from "../Card/Card";
import api from "../../utils/Api";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike,onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  // const currentCard = React.useContext(CurrentCardContext);

  // const [cards, setCards] = React.useState([]);

  // React.useEffect(() => {
  //   api
  //     .getCards()
  //     .then((data) => {
  //       setCards(data);
  //     })
  //     .catch((e) => console.log(e));
  // });

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some((item) => item._id === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card, isLiked);
  // }

  // function handleCardDelete(card) {
  //   api.deleteCard(card).then(() => {
  //     setCards(cards.filter((item) => item._id !== card._id))
  //   });

  // }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img
            src={`${currentUser.avatar}`}
            className="profile__image"
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__paragraph">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Cards
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            onCardClick={onCardClick}
            card={card}
            currentUser={currentUser}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};
export default Main;
