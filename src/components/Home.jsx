import { useState, useEffect } from 'react';
import Post from './Post';
import NewPostModal from './NewPostModal';

const Home = ({ setPosts, posts, isOpen, setIsOpen, userId }) => {
  

  return (
    <div>
      {isOpen && (
        <NewPostModal setIsOpen={setIsOpen} setPosts={setPosts} posts={posts} userId={userId} />
      )}
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
