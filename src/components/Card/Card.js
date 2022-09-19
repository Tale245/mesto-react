const Card = ({link, name, likes, onCardClick}) => {

  function handleClick() {
    onCardClick(link)
  }  

    return(
        <div className="element">
              <img src= {`${link}`}className="element__img" alt="изображение" onClick={handleClick}/>
              <div className="element__item">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-container">
                  <button className="element__button"></button>
                  <p className="element__like">{likes.length}</p>
                </div>
                <button className="element__trash-button"></button>
              </div>
            </div>
    )
}
export default Card