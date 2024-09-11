import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Post.css';


const Post = ({ title, content, username, timestamp }) => {
  return (
    <div>
      <div className='postInfo'>
        <FontAwesomeIcon className="avatar" icon={faUser} />
        <div className='username'>{username}</div>
        <div className='spacerDots'>{'\u2B24'}</div>
        <div className='timestamp'>{timestamp}</div>
        <div className='spacerDots'>{'\u2B24'}{'\u2B24'}{'\u2B24'}</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postContent">{content}</div>
    </div>
  );
};

export default Post;
