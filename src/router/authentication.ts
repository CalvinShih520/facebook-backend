import express from 'express';

import { login,signup,token,logout } from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/signup', signup);
    router.post('/auth/login', login);
    router.post('/auth/token', token);
    router.delete('/auth/logout', logout);
};