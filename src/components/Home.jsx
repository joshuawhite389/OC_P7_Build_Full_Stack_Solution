import Post from './Post';
import NewPostModal from './NewPostModal';
import '../styles/Home.css';

const Home = ({ setPosts, posts, isOpen, setIsOpen, userId, token, getPosts }) => {
  return (
    <div className='appContainer'>
      {isOpen && (
        <NewPostModal
          setIsOpen={setIsOpen}
          setPosts={setPosts}
          posts={posts}
          userId={userId}
          token={token}
          getPosts={getPosts}
        />
      )}
      <div className="postContainer">
      {posts.length === 0 ? (
          <p>No posts yet...</p>
        ) : (
          posts
            .slice() // Create a shallow copy of the posts array to avoid mutating the original array
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
            .map(({ post_id, title, content, username, image_url, created_at, user_id }) => (
              <Post
                key={post_id}
                post_id={post_id}
                title={title}
                content={content}
                username={username}
                created_at={created_at}
                userId={userId}
                token={token}
                getPosts={getPosts}
                image_url={image_url}
                userIdOfPost={user_id}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
