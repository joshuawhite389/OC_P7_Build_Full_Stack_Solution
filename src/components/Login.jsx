import { useState } from "react";
import "../styles/Login.css";


const Login = () => {

  const [userHasAccount, setUserHasAccount] = useState(false);

  const handleOnSubmit = () => {
    if (userHasAccount) {
      // capture username and password, send to server login endpoint
    }
    else {
      // capture username and password, send to server register endpoint
    }
    console.log('Login Clicked');
  };

  const handleLoginToggle = (e) => {
    e.preventDefault();
    setUserHasAccount(!userHasAccount);
  }


  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">{userHasAccount ? "SIGN UP" : "LOGIN"}</h2>
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password" id="password" placeholder="Password"></input>
        <button type="button" className="btn" onClick={handleOnSubmit}>
          {userHasAccount ? "REGISTER" : "LOGIN"}
        </button>
        <p className="goto">Need an account? <button className="gotoBtn" onClick={(e) => handleLoginToggle(e)}>{userHasAccount ? "LOGIN" : "SIGN UP"}</button></p> 
      </form>
    </>
  );
};

export default Login;
