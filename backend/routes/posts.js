const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, updatePost, deletePost, addComment, updateComment, deleteComment } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/comments', auth, addComment);
router.put('/:id/comments/:commentId', auth, updateComment);
router.delete('/:id/comments/:commentId', auth, deleteComment);

module.exports = router;