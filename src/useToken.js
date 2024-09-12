import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUserId = () => {
    const userIdString = sessionStorage.getItem('userId');
    const userId = JSON.parse(userIdString);
    return userId;
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const saveUserId = userId => {
    sessionStorage.setItem('userId', JSON.stringify(userId));
    setUserId(userId);
  };

  return {
    setToken: saveToken,
    setUserId: saveUserId,
    token,
    userId
  };
}