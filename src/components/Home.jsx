import { useState, useEffect } from 'react';
import Post from './Post';
import NewPostModal from './NewPostModal';

const Home = ({ setPosts, posts, isOpen }) => {
  

  async function getPosts() {
    const response = await fetch('http://localhost:3001/api/posts');
    const data = await response.json();
    setPosts(data);
  
  }

  useEffect(() => {
    getPosts();
  }, []);

  

  return (
    <div>
      {isOpen && <NewPostModal />}
      {posts.map(({ post_id, title, content, username, timestamp }) => (
        <Post
          key={post_id}
          title={title}
          content={content}
          username={username}
          timestamp={timestamp}
        />
      ))}
    </div>
  );
};

export default Home;
