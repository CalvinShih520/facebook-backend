import express from 'express';
import { createComment, getComments } from '../controllers/comments';
import authenticateToken from '../middlewares/authenticateToken';

export default (router: express.Router) => {
    router.post('/posts/:postId/comments', authenticateToken, createComment);
    router.get('/posts/:postId/comments', authenticateToken, getComments);
};
