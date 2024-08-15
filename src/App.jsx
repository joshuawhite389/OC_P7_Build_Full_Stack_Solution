import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import logo from './assets/Groupomania_Logos/icon-left-font.png';
import './styles/App.css';

function setToken(token) {
  sessionStorage.setItem('token', JSON.stringify(token));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const App = () => {
  const [view, setView] = useState('login');
  const token = getToken();

  return (
    <>
      <img src={logo} alt="Groupomania logo" className="logo" />
      <div className="inputContainer">
        {!token ? (
          view === 'login' ? (
            <>
              <Login setToken={setToken} setView={setView} />
            </>
          ) : (
            <>
              <Signup setToken={setToken} setView={setView} />
            </>
          )
        ) : (
          <h2>The App</h2>
        )}
      </div>
    </>
  );
};

export default App;
