import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Account from './pages/Account';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Account/>} />
      <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
