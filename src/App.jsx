import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import './styles/App.css';
import useToken from './useToken';
import Home from './components/Home';
import Header from './components/Header';



const App = () => {
  const [view, setView] = useState('login');
  const { token, setToken } = useToken();
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <Header 
        posts={posts}
        setPosts={setPosts}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
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
          <Home 
            posts={posts}
            setPosts={setPosts}
            isOpen={isOpen}
          />
        )}
      </div>
    </>
  );
};

export default App;
