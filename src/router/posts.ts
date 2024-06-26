import express from 'express';
import { getPublic, getPrivate, createPost } from '../controllers/posts';
import authToken from '../middlewares/authenticateToken';

export default (router: express.Router) => {
    router.get('/posts/public', getPublic);
    router.get('/posts/private', authToken, getPrivate);
    router.post('/posts/:userId', authToken, createPost);
};
