import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Post.css';
import { useEffect, useState } from 'react';

const Post = ({
  title,
  content,
  username,
  created_at,
  post_id,
  userId,
  token,
  getPosts,
  userIdOfPost,
}) => {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState();
  const [readPosts, setReadPosts] = useState([]);

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

  const getReadPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/posts/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application  /json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setReadPosts(data.readPosts);
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    getReadPosts();
  }, [readPosts]);

  const handleDelete = async (post_id) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/posts/deletePost',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post_id: post_id,
          }),
        }
      );
      if (!response.ok) {
        console.error('Failed to delete post');
      } else {
        getPosts();
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleClick = () => {
    navigate(`/posts/${post_id}`);
    // add post to user's read_posts
    handleUpdateReadPosts(post_id);
  };

  const handleUpdateReadPosts = async (post_id) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/posts/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post_id: post_id,
            userId: userId,
          }),
        }
      );
      if (!response.ok) {
        console.error('Failed to update read posts');
      } else {
        getReadPosts();
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const getLoginUsername = () => {
    const usernameString = sessionStorage.getItem('username');
    const username = JSON.parse(usernameString);
    setLoginUsername(username);
  };

  useEffect(() => {
    getLoginUsername();
  }, []);

  return (
    <div onClick={handleClick} className="postContainer">
      <div className="post">
        <div className="postInfo">
          <div className="avatarContainer">
            <FontAwesomeIcon className="avatar" icon={faUser} />
          </div>
          <div className="username">{username}</div>
          <div className="timestamp">{convertToEST(created_at)}</div>
          {/* if the post has not been read, add unread indicator. If post made by user, never show unread.  */}
          {readPosts && readPosts.includes(post_id) ? null : userId ===
            userIdOfPost ? null : (
            <div className="unread">New</div>
          )}
          {loginUsername === username && (
            <FontAwesomeIcon
              className="trashCan"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(post_id);
              }}
              icon={faTrashCan}
            />
          )}
        </div>
        <div className="postTitle">{title}</div>
      </div>
    </div>
  );
};

export default Post;
