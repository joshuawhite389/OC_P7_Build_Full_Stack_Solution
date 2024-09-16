import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../styles/PostDetail.css';
import Header from './Header';
import EditPostModal from './EditPostModal';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const getUserId = () => {
    const userIdString = sessionStorage.getItem('userId');
    const userIdFromSession = JSON.parse(userIdString);
    setUserId(userIdFromSession);
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const tokenString = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
      const token = JSON.parse(tokenString);

      try {
        const response = await fetch(
          `http://localhost:3001/api/posts/${postId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Cannot display this post...</div>;
  }

  const handleGoBack = () => {
    navigate('/');
  };

  const handleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  return (
    <div>
      <Header />
      {editModalOpen && (
        <EditPostModal
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          postTitle={post.title}
          postContent={post.content}
          postId={post.post_id}
          postImage={post.image_url}
        />
      )}
      <div className="icons">
        <FontAwesomeIcon
          className="backArrow"
          onClick={handleGoBack}
          icon={faArrowLeft}
        />
        {userId === post.user_id && (
          <FontAwesomeIcon
            className="edit"
            onClick={handleEditModal}
            icon={faPenToSquare}
          />
        )}
      </div>
      <div className="postDetailContainer">
        <h1>{post.title}</h1>
        <p className="postContent">{post.content}</p>
        {post.image_url && (
          <div className="imgContainer">
            <img className="postImg" src={post.image_url} alt={post.title} />
          </div>
        )}
        <p>
          By {post.username} on {new Date(post.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
