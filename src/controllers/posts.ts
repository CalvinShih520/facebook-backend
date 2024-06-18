import express from 'express';
import { getPublicPosts, getPrivatePosts, createPost as createPostInDB } from '../db/posts';

export const getPublic = async (req: express.Request, res: express.Response) => {
    try {
        const posts = await getPublicPosts();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPrivate = async (req: express.Request, res: express.Response) => {
    try {
        const posts = await getPrivatePosts();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createPost = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;
        const { content, isPrivate } = req.body;
        if (!content || !userId) {
            return res.sendStatus(400);
        }

        const user_id = userId;  // 从认证中间件中获取 user_id
        const post = await createPostInDB({ content, isPrivate, user_id });

        return res.status(201).json(post);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
