import React from 'react';
import PostItem from './PostItem';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;