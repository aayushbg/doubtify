import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import { getPost, addComment } from '../services/api';
import { isAuthenticated } from '../services/auth';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const data = await getPost(id);
    setPost(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(id, { content: comment });
    setComment('');
    fetchPost();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Posted by: {post.user.username}</p>
      <CommentList comments={post.comments} />
      {isAuthenticated() && (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default PostDetail;