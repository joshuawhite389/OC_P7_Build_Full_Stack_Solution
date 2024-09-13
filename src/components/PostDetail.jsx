import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        By {post.username} on {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default PostDetail;
