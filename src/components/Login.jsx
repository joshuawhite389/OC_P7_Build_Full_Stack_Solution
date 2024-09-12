import { useEffect, useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';



const Login = ({ setToken, setView, setUserId }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  async function loginUser(credentials) {
    try {
      const { username, password } = credentials;
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }
      setToken(data.token);
      console.log(data);
      setUserId(data.userId);
      setError(null);
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    } else {
      await loginUser({
        username,
        password,
      });
      setUsername('');
      setPassword('');
    }
  };

  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">LOGIN</h2>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error && <span className="errorMsg">{error}</span>}
        <button
          type="button"
          className="btn"
          onClick={(e) => handleOnSubmit(e)}
        >
          LOGIN
        </button>
        <p className="view">
          Don't have an account?{' '}
          <Link className="viewLink" to="#" onClick={() => setView('signup')}>
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
