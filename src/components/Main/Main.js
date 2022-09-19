import React from "react";
import api from "../../utils/Api";
import Cards from "../Card/Card";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .userName()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((e) => console.log(e));
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((e) => console.log(e));
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img
            src={`${userAvatar}`}
            className="profile__image"
            alt="Аватар профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__paragraph">{userDescription}</p>
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
          />
        ))}
      </section>
    </main>
  );
};
export default Main;
