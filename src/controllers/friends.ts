import express from 'express';
import { getUserById,getUsers } from '../db/users';
import { UserModel } from '../db/users';

export const getFriends = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user._id;
        console.log("Fetching friends for user ID:", userId);
        const user = await getUserById(userId).populate('friends', 'username email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching friends:", error);
        return res.sendStatus(400);
    }
};

export const searchUsers = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user._id;
        const { query } = req.params;
        
        // 获取当前用户并填充其好友列表
        const user = await getUserById(userId).populate('friends', 'username email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 获取所有用户
        const allUsers = await getUsers();

        // 过滤掉当前用户和已经是好友的用户
        const filteredUsers = allUsers.filter(u => 
            u._id.toString() !== userId.toString() && 
            !user.friends.some(friend => friend._id.toString() === u._id.toString()) &&
            u.username.toLowerCase().includes(query.toLowerCase())
        );

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const sendFriendRequest = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user._id;
        const { friendId } = req.body;

        const user = await getUserById(userId);
        const friend = await getUserById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 添加好友请求
        user.sentRequests.push(friendId);
        friend.receivedRequests.push(userId);

        await user.save();
        await friend.save();

        return res.status(200).json({ message: 'Friend request sent' });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const respondToFriendRequest = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user._id;
        const { friendId, action } = req.body;

        const user = await getUserById(userId);
        const friend = await getUserById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (action === 'accept') {
            // 接受好友请求
            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId);
            }
            if (!friend.friends.includes(userId)) {
                friend.friends.push(userId);
            }
        }

        // 移除好友请求
        const originalReceivedRequests = [...user.receivedRequests];
        const originalSentRequests = [...friend.sentRequests];
        user.receivedRequests = user.receivedRequests.filter(id => id.toString() !== friendId);
        friend.sentRequests = friend.sentRequests.filter(id => id.toString() !== userId);

        await user.save();
        await friend.save();

        console.log("Original received requests:", originalReceivedRequests);
        console.log("Updated received requests:", user.receivedRequests);
        console.log("Original sent requests:", originalSentRequests);
        console.log("Updated sent requests:", friend.sentRequests);

        return res.status(200).json({ message: `Friend request ${action}ed` });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
