import { useEffect, useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = ({ setToken, setView }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">LOGIN</h2>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          type="button"
          className="btn"
          onClick={(e) => handleOnSubmit(e)}
        >
          LOGIN
        </button>
        <p className="view">
          Don't have an account?{' '}
          <Link className='viewLink' to="#" onClick={() => setView('signup')}>
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
