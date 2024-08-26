import React from 'react';

function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <p>{comment.content}</p>
      <p>By: {comment.user.username}</p>
    </div>
  );
}

export default CommentItem;