import logo from '../assets/Groupomania_Logos/icon-left-font-cropped.png';
import icon from '../assets/Groupomania_Logos/icon.png';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AccountModal from './AccountModal';
import { useState } from 'react';

const Header = ({ setIsOpen, isOpen, token,  }) => {
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleAccountModal = () => {
    if (token) {
      setAccountModalOpen(!accountModalOpen);
    }
  };

  return (
    <div className="logoContainer">
      <img src={logo} alt="Groupomania logo" className="logo" />
      <img src={icon} alt="Groupomania logo" className="icon" />
      <div className="accountPostContainer">
        {token && (
          <button className="newPostContainer" onClick={openModal}>
            <FontAwesomeIcon className="plusBtn" icon={faCirclePlus} />
            <p className='newPostText'>Create New Post</p>
          </button>
        )}
        <div className="profileIconContainer" onClick={handleAccountModal}>
          <FontAwesomeIcon className="profileIcon" icon={faUser} />
        </div>
        <AccountModal
          accountModalOpen={accountModalOpen}
          setAccountModalOpen={setAccountModalOpen}
        />
      </div>
    </div>
  );
};

export default Header;
