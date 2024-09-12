import React, { useState, useEffect } from 'react';
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
  const { userId, setUserId } = useToken();
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  async function getPosts() {
    const response = await fetch('http://localhost:3001/api/posts');
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, [posts]);


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
              <Login setToken={setToken} setView={setView} setUserId={setUserId} />
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
            setIsOpen={setIsOpen}
            userId={userId}
          />
        )}
      </div>
    </>
  );
};

export default App;
