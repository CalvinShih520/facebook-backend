import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' }, // 關聯到貼文
    content: { type: String, required: true }, // 留言內容
    createdAt: { type: Date, default: Date.now } // 留言創建時間
}, { collection: 'comments' });

export const commentModel = mongoose.model('Comment', commentSchema);

// 添加留言
export const addComment = (values: Record<string, any>) => new commentModel(values).save().then((comment) => comment.toObject());

// 根據貼文ID獲取留言
export const getCommentsByPostId = (postId: string) => commentModel.find({ postId });
