import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../styles/PostDetail.css';
import Header from './Header';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

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

  return (
    <div>
      <Header />
      <FontAwesomeIcon
        className="backArrow"
        onClick={handleGoBack}
        icon={faArrowLeft}
      />
      <div className="postDetailContainer">
        <h1>{post.title}</h1>
        <p className='postContent'>{post.content}</p>
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
