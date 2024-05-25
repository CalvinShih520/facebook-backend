import mongoose from "mongoose";

const publicPostSchema = new mongoose.Schema({
    title: { type: String, require: true},
    content: { type: String, require: true},
}, { collection: 'publicPosts' });

export const publicPostsModel = mongoose.model('publicPost', publicPostSchema);
export const getPublicPosts = () => publicPostsModel.find();

const privatePostSchema = new mongoose.Schema({
    title: { type: String, require: true},
    content: { type: String, require: true},
}, { collection: 'privatePosts' });

export const privatePostsModel = mongoose.model('PrivatePost', privatePostSchema);
export const getPrivatePosts = () => privatePostsModel.find();
