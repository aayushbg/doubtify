import axios from 'axios';

const API_URL = 'https://doubtify-backend.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = () => api.get('/posts').then(res => res.data);
export const getPost = (id) => api.get(`/posts/${id}`).then(res => res.data);
export const createPost = (post) => api.post('/posts', post).then(res => res.data);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post).then(res => res.data);
export const deletePost = (id) => api.delete(`/posts/${id}`).then(res => res.data);
export const addComment = (id, comment) => api.post(`/posts/${id}/comments`, comment).then(res => res.data);
export const updateComment = (postId, commentId, comment) => api.put(`/posts/${postId}/comments/${commentId}`, comment).then(res => res.data);
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`).then(res => res.data);
