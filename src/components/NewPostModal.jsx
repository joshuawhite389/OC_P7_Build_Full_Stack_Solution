
const NewPostModal = ({ setIsOpen }) => {
  return <div>
    <div className="modal" >
      <div className="modalContent">
        <h2>Create New Post</h2>
        <form>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  </div>;
};

export default NewPostModal;
