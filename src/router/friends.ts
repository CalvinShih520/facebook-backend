import express from 'express';
import { getFriends, searchUsers, sendFriendRequest, respondToFriendRequest } from '../controllers/friends';
import authToken from '../middlewares/authenticateToken';

export default (router: express.Router) => {
    router.get('/friends', authToken, getFriends);
    router.get('/search/:query', authToken, searchUsers);
    router.post('/friends/request', authToken, sendFriendRequest);
    router.post('/friends/respond', authToken, respondToFriendRequest);
};