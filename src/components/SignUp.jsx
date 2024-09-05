import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ setView }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  async function signUpUser(credentials) {
    try {
      const { username, password } = credentials;
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }
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
      await signUpUser({
        username,
        password,
      });
      setUsername('');
      setPassword('');
      setView('login');
    }
  };

  return (
    <>
      <form className="inputForm">
        <h2 id="loginHeading">SIGN UP</h2>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {error && <span className="errorMsg">{error}</span>}
        <button
          type="button"
          className="btn"
          onClick={(e) => handleOnSubmit(e)}
        >
          REGISTER
        </button>
        <p className="view">
          Already have an account?{' '}
          <Link className="viewLink" to="#" onClick={() => setView('login')}>
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
