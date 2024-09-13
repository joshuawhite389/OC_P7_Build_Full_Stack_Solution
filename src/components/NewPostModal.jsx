import '../styles/NewPostModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const NewPostModal = ({ setPosts, posts, setIsOpen, userId, token, getPosts }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  async function createPost() {
    try {
      const response = await fetch('http://localhost:3001/api/posts/newPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          title: titleRef.current.value,
          content: contentRef.current.value,
        }),
      });
      if (!response.ok) {
        console.error('Failed to create post');
      } else {
        getPosts();
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!titleRef.current.value || !contentRef.current.value) {
  //     console.error('Please fill in all fields');
  //     return;
  //   } else {
  //     createPost();
  //     closeModal();
  //   }
  // };

  const handleOnSubmit = (e, titleRef, contentRef, imageRef) => {
    e.preventDefault();
  
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const imageFile = imageRef.current.files[0];
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user_id', userId);
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    
    fetch('http://localhost:3001/api/posts/newPost', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        getPosts();
        closeModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
          <h2>Create New Post</h2>
          <form className="modalForm" onSubmit={(e) => handleOnSubmit(e, titleRef, contentRef, imageRef)}>
          {/* <form className="modalForm" onSubmit={handleOnSubmit}> */}
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              ref={titleRef}
              required
            />
            <label htmlFor="content">Content:</label>
            <textarea id="content" name="content" ref={contentRef} required />
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" ref={imageRef} accept="image/*" />
            <button type="submit">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
