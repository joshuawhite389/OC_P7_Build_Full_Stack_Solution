import { useEffect, useState } from 'react';
import '../styles/Login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
function setToken(token) {
  sessionStorage.setItem('token', JSON.stringify(token));
}
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}



const Login = () => {
  const [userHasAccount, setUserHasAccount] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (userHasAccount) {
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
    } else {
      // capture username and password, send to server register endpoint
    }
  };

  const handleLoginToggle = (e) => {
    e.preventDefault();
    setUserHasAccount(!userHasAccount);
  };


  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">{userHasAccount ? 'LOGIN' : 'SIGN UP'}</h2>
        <input type="text" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
        <input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleOnSubmit(e)}
        >
          {userHasAccount ? 'LOGIN' : 'REGISTER'}
        </button>
        <p className="goto">
          {userHasAccount ? 'Need an account? ' : 'Already have an account? '}
          <button className="gotoBtn" onClick={(e) => handleLoginToggle(e)}>
            {userHasAccount ? 'SIGN UP' : 'LOGIN'}
          </button>
        </p>
      </form>
    </>
  );
};

export default Login;
