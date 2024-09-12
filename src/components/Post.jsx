import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Post.css';

const Post = ({ title, content, username, created_at, post_id }) => {
  const navigate = useNavigate();

  function convertToEST(isoDateString) {
    const date = new Date(isoDateString);
    const options = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleString('en-US', options);
  }

  const handleDelete = async (post_id) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/posts/deletePost',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: post_id,
          }),
        }
      );
      if (!response.ok) {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleClick = () => {
    navigate(`/posts/${post_id}`);
  };

  return (
    <div onClick={handleClick} className="postContainer">
      <div className="post">
        <div className="postInfo">
          <div className="avatarContainer">
            <FontAwesomeIcon className="avatar" icon={faUser} />
          </div>
          <div className="username">{username}</div>
          <div className="timestamp">{convertToEST(created_at)}</div>
          <FontAwesomeIcon
            className="trashCan"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post_id);
            }}
            icon={faTrashCan}
          />
        </div>
        <div className="postTitle">{title}</div>
      </div>
    </div>
  );
};

export default Post;
