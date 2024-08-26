const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ user: req.user.id, title, description });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt').populate('user', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username').populate('comments.user', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!post) return res.status(404).json({ error: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.comments.push({ user: req.user.id, content });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, 'comments._id': req.params.commentId, 'comments.user': req.user.id },
      { $set: { 'comments.$.content': content } },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Comment not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.commentId, user: req.user.id } } },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Comment not found or unauthorized' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};