import { Link } from 'react-router-dom';
import Authentication from '../components/Authentication';
import logo from '../assets/Groupomania_Logos/icon-left-font.png';
import '../styles/Account.css';

const Account = () => {
  return (
    <>
      <img src={logo} alt="Groupomania logo" className="logo" />
      <div className='inputContainer'>
        <Authentication />
        {/* <Link className="link" to="/home">SIGN UP</Link> */}
      </div>
    </>
  );
};

export default Account;
