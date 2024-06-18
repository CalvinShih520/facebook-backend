import express from 'express';
import authentication from './authentication';
import users from './users';
import getposts from './posts';
import comments from './comments';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    getposts(router);
    comments(router);

    return router;
};
