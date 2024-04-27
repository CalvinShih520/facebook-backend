import express from 'express';

import { getAllUsers,deleteUsers,updateUser } from '../controllers/users';
import { isAuthenticated , isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.delete('/users/:id',deleteUsers);
    router.patch('/users/:id',updateUser);

    router.get('/users',isAuthenticated, getAllUsers);
    //router.delete('/users/:id',isAuthenticated,deleteUsers);
    //router.patch('/users/:id',isAuthenticated,isOwner,updateUser);
}