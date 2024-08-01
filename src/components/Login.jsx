import "../styles/Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
  const handleOnSubmit = () => {
    console.log('Login Clicked');
  };

  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">LOGIN</h2>
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password" id="password" placeholder="Password"></input>
        <button type="button" className="btn" onClick={handleOnSubmit}>
          LOGIN
        </button>
        <p className="goto">Need an account? <Link className="link" to="/home">SIGN UP</Link></p> 
      </form>
    </>
  );
};

export default Login;
