import logo from '../assets/Groupomania_Logos/icon-left-font-cropped.png';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  return (
    <div className="logoContainer">
      <img src={logo} alt="Groupomania logo" className="logo" />
      <div className='profileIconContainer'>
        <FontAwesomeIcon className="profileIcon" icon={faUser} />
      </div>
    </div>
  );
};

export default Header;
