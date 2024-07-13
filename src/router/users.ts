import express from 'express';
import { getAllUsers, deleteUsers, updateUser,getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.get('/users/:id', isAuthenticated, isOwner, getUser);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUsers);
    // router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.patch('/users/:id', updateUser);
};
