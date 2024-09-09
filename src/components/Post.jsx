import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Post.css';


const Post = () => {
  return (
    <div>
      <div className='postInfo'>
        <FontAwesomeIcon className="avatar" icon={faUser} />
        <div className='username'>Username</div>
        <div className='spacerDots'>{'\u2B24'}</div>
        <div className='timestamp'>Time/ Date of Post</div>
        <div className='spacerDots'>{'\u2B24'}{'\u2B24'}{'\u2B24'}</div>
      </div>
      <div className="postTitle">Title of Post</div>
      <div className="postContent">This is a new post with the following content...</div>
    </div>
  );
};

export default Post;
