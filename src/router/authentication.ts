import express from 'express';

import { login,register,token,logout } from '../controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/token', token);
    router.delete('/auth/logout', logout);
};