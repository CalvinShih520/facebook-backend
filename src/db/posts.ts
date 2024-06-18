import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now } // 自动生成创建时间
}, { collection: 'posts' });

export const postModel = mongoose.model('Post', postSchema);

export const getPublicPosts = () => postModel.find({ isPrivate: false }).sort({ createdAt: -1 }).populate('user_id'); // 按创建时间降序排序
export const getPrivatePosts = () => postModel.find({ isPrivate: true }).sort({ createdAt: -1 }).populate('user_id'); // 按创建时间降序排序

export const createPost = (values: Record<string, any>) => new postModel(values).save().then((post) => post.toObject());
