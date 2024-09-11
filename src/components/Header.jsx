import logo from '../assets/Groupomania_Logos/icon-left-font-cropped.png';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
const Header = ({ setPosts, posts, setIsOpen, isOpen }) => {
  async function createPost() {
    try {
      const response = await fetch('/api/posts/newPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          /* data for the new post */
        }),
      });
      if (response.ok) {
        // Post created successfully
        // Update the posts state or perform any other necessary actions
        setPosts([...posts /* new post object */]);
      } else {
        // Handle error response
        console.error('Failed to create post');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  }

  const openModal = () => {
    setIsOpen(!isOpen);
  }

  const newPost = {
    user_id: 1,
    username: '',
    title: '',
    content: '',
  };

  return (
    <div className="logoContainer">
      <img src={logo} alt="Groupomania logo" className="logo" />
      <div className="accountPostContainer">
        <button className="newPostContainer" onClick={openModal}>
          <FontAwesomeIcon className="plusBtn" icon={faCirclePlus} />
          <p>Create New Post</p>
        </button>
        <div className="profileIconContainer">
          <FontAwesomeIcon className="profileIcon" icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
