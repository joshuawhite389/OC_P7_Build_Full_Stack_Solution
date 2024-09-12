import { useState, useEffect } from 'react';
import Post from './Post';
import NewPostModal from './NewPostModal';

const Home = ({ setPosts, posts, isOpen, setIsOpen, userId }) => {
  return (
    <div>
      {isOpen && (
        <NewPostModal
          setIsOpen={setIsOpen}
          setPosts={setPosts}
          posts={posts}
          userId={userId}
        />
      )}
      <div className="postContainer">
        {posts
          .slice() // Create a shallow copy of the posts array to avoid mutating the original array
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
          .map(({ post_id, title, content, username, created_at }) => (
            <Post
              key={post_id}
              post_id={post_id}
              title={title}
              content={content}
              username={username}
              created_at={created_at}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
