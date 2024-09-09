import { useState } from 'react';
import Post from './Post';

const Home = () => {
  const [posts, setPosts] = useState(['post1', 'post2', 'post3']);

  return (
    <div>
      {posts.map((post) => (
        <Post />
      ))}
    </div>
  );
};

export default Home;
