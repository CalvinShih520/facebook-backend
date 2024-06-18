import express from 'express';
import { addComment, getCommentsByPostId } from '../db/comments';

export const createComment = async (req: express.Request, res: express.Response) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        if (!postId || !content) {
            return res.sendStatus(400);
        }

        const comment = await addComment({ postId, content });

        return res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getComments = async (req: express.Request, res: express.Response) => {
    try {
        const { postId } = req.params;
        const comments = await getCommentsByPostId(postId);

        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
