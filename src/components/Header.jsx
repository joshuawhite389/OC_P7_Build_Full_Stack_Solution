import logo from '../assets/Groupomania_Logos/icon-left-font-cropped.png';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
const Header = ({ setIsOpen, isOpen }) => {
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="logoContainer">
      <img src={logo} alt="Groupomania logo" className="logo" />
      <div className="accountPostContainer">
        <button className="newPostContainer" onClick={openModal}>
          <FontAwesomeIcon className="plusBtn" icon={faCirclePlus} />
          <p>Create New Post</p>
        </button>
        <div className="profileIconContainer">
          <FontAwesomeIcon className="profileIcon" icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
