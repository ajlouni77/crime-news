const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


router.post('/', postController.createPost);


router.get('/admin', postController.getPostsAdmin);


router.get('/', postController.getPosts);


router.put('/:id', postController.updatePost);


router.delete('/:id', postController.deletePost);

module.exports = router;
