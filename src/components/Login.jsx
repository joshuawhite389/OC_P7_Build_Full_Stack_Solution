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
const Login = () => {
  const [userHasAccount, setUserHasAccount] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (userHasAccount) {
      loginUser({ test: '123' });
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
        <h2 id="loginHeading">{userHasAccount ? 'SIGN UP' : 'LOGIN'}</h2>
        <input type="text" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
        <input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleOnSubmit(e)}
        >
          {userHasAccount ? 'REGISTER' : 'LOGIN'}
        </button>
        <p className="goto">
          {userHasAccount ? 'Already have an account? ' : 'Need an account? '}
          <button className="gotoBtn" onClick={(e) => handleLoginToggle(e)}>
            {userHasAccount ? 'LOGIN' : 'SIGN UP'}
          </button>
        </p>
      </form>
    </>
  );
};

export default Login;
