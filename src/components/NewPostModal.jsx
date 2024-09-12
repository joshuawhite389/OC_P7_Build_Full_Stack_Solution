import '../styles/NewPostModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const NewPostModal = ({ setPosts, posts, setIsOpen, userId }) => {

  const titleRef = useRef();
  const contentRef = useRef();

  async function createPost() {
    try {
      const response = await fetch('http://localhost:3001/api/posts/newPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          title: titleRef.current.value,
          content: contentRef.current.value,
        }),
      });
      if (response.ok) {
        // Post created successfully
        // Update the posts state or perform any other necessary actions

        // setPosts([...posts /* new post object */]);
      } else {
        // Handle error response
        console.error('Failed to create post');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!titleRef.current.value || !contentRef.current.value) {
      console.error('Please fill in all fields');
      return;
    }
    else {
      createPost();
      closeModal();
    }
  }

  return (
    <div>
      <div className="modal">
        <div className="modalContent">
          <FontAwesomeIcon className="closeButton" onClick={closeModal} icon={faCircleXmark} />
          <h2>Create New Post</h2>
          <form className="modalForm" onSubmit={handleOnSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" ref={titleRef} required />
            <label htmlFor="content">Content:</label>
            <textarea id="content" name="content" ref={contentRef} required />
            <button type="submit" >Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
