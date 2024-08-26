import React from 'react';
import { Link } from 'react-router-dom';

function PostItem({ post }) {
  return (
    <div className="post-item">
      <h3><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
      <p>{post.description.substring(0, 100)}...</p>
      <p>Posted by: {post.user.username}</p>
      <p>Comments: {post.comments.length}</p>
    </div>
  );
}

export default PostItem;