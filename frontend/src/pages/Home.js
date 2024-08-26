import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import { getPosts, createPost } from '../services/api';
import { isAuthenticated } from '../services/auth';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, description });
    setTitle('');
    setDescription('');
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>Doubt Solver</h1>
      {isAuthenticated() && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit">Post Doubt</button>
        </form>
      )}
      <PostList posts={posts} />
    </div>
  );
}

export default Home;