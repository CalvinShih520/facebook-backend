import express from 'express';
import { getPublicPosts , getPrivatePosts } from '../db/posts';

export const getPublic = async ( req: express.Request, res: express.Response) => {
    try{
        const posts = await getPublicPosts();

        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPrivate = async ( req: express.Request, res: express.Response) => {
    try{
        const posts = await getPrivatePosts();

        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}