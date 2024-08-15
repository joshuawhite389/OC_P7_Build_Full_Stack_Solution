import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function loginUser(credentials) {
  const { username, password } = credentials;
  return fetch('http://localhost:3001/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then((data) => data.json());
}

const SignUp = ({ setToken, setView }) => {
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
        <h2 id="loginHeading">SIGN UP</h2>
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
          REGISTER
        </button>
        <p className="view">
          Already have an account?{' '}
          <Link className='viewLink' to="#" onClick={() => setView('login')}>
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
