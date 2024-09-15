import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountModal.css';

const AccountModal = ({ accountModalOpen, setAccountModalOpen }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setAccountModalOpen(!accountModalOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
    setAccountModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    const userIdString = sessionStorage.getItem('userId');
    const userId = JSON.parse(userIdString);
    const tokenString = sessionStorage.getItem('token');
    const token = JSON.parse(tokenString);
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:3001/api/auth/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          user_id: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data.message);
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
        setAccountModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  return (
    <div>
      {accountModalOpen &&
        (showConfirmation ? (
          <div className="modal-overlay">
            <div className="modal-content">
              Are you sure you want to delete your account?
              <ul>
                <li className="button" onClick={handleDeleteAccount}>
                  Yes
                </li>
                <li className="button" onClick={handleDeleteConfirmation}>
                  No
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ul>
                <li className="button" onClick={handleLogout}>
                  Logout
                </li>
                <li className="button" onClick={handleDeleteConfirmation}>
                  Delete Account
                </li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AccountModal;
