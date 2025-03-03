import "./Post.css";

function Post({ id, username, avatar, attachments = [], getPost, getOwner, children }) {
  const handleComment = () => {
    // TODO: Implement comment functionality
    console.log('Comment clicked on post:', id);
  };

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log('Like clicked on post:', id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share clicked on post:', id);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img className="post-avatar" src={avatar} alt={`${username} avatar`} />
        <span className="post-username">{username}</span>
      </div>
      <div className="post-body">
        <p>{children}</p>
        {attachments.map((attachment, index) => {
          switch (attachment.type) {
            case 'post': {
              const referenced = typeof attachment.post === 'object' 
              ? attachment.post 
              : getPost(attachment.post);

              const owner = typeof referenced.owner === 'object' 
                ? referenced.owner 
                : getOwner(referenced.owner);
              
              return (
                <Post
                  key={`post-${id}-attachment-${index}`}
                  id={referenced.id}
                  username={owner.username}
                  avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${owner.username}`}
                  attachments={referenced.attachments ?? []}
                  getPost={getPost}
                  getOwner={getOwner}
                >
                  {referenced.content}
                </Post>
              );
            }
            case 'image':
              return (<img key={`post-${id}-attachment-${index}`} src={attachment.image} />);
            case 'link':
              return (<a key={`post-${id}-attachment-${index}`} href={attachment.link}>{attachment.link}</a>);
            default:
              return (<p key={`post-${id}-attachment-${index}`} >Attachment type not yet implemented</p>);
          }
        })}
      </div>
      <div className="post-footer">
        <button onClick={handleComment} className="post-button">
          <i className="fas fa-comment"></i>
          Comment
        </button>
        <button onClick={handleLike} className="post-button">
          <i className="fas fa-heart"></i>
          Like
        </button>
        <button onClick={handleShare} className="post-button">
          <i className="fas fa-share"></i>
          Share
        </button>
      </div>
    </div>
  );
}

export default Post;
