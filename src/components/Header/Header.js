const Header = ({ logo }) => {
  return (
    <header className="header">
      <a href="index.html" className="header__link">
        <img src={logo} alt="логотип проекта Место" className="header__logo" />
      </a>
    </header>
  );
};
export default Header;
