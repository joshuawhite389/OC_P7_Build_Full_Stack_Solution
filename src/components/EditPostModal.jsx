import '../styles/NewPostModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';

const EditPostModal = ({ setEditModalOpen, postId }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const getUserIdAndToken = () => {
    const userIdString = sessionStorage.getItem('userId');
    const userIdFromSession = JSON.parse(userIdString);
    setUserId(userIdFromSession);
    const tokenString = sessionStorage.getItem('token');
    const tokenFromSession = JSON.parse(tokenString);
    setToken(tokenFromSession);
  };

  useEffect(() => {
    getUserIdAndToken();
  }, []);

  const updatePost = async (formData) => {
    await fetch('http://localhost:3001/api/posts/updatePost', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        closeModal();
        // Refresh the page to display the updated post
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleOnSubmit = async (e, titleRef, contentRef, imageRef) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const imageFile = imageRef.current.files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user_id', userId);
    formData.append('post_id', postId);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    updatePost(formData);
  };

  return (
    <div>
      <div className="modal">
        <div className="modalContent">
          <FontAwesomeIcon
            className="closeButton"
            onClick={closeModal}
            icon={faCircleXmark}
          />
          <h2>Edit Post</h2>
          <form
            className="modalForm"
            onSubmit={(e) => handleOnSubmit(e, titleRef, contentRef, imageRef)}
          >
            <label id="titleLabel" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              ref={titleRef}
              required
            />
            <label id="contentLabel" htmlFor="content">
              Content:
            </label>
            <textarea id="content" name="content" ref={contentRef} required />
            <label id="imageLabel" htmlFor="image">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              ref={imageRef}
              accept="image/*"
            />
            <button className="postButton" type="submit">
              Submit Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
