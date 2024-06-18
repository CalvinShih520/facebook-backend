import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, gender, birthdate, phone } = req.body;

        if (!username && !email && !gender && !birthdate && !phone) {
            return res.sendStatus(400);
        }

        const updateData: Record<string, any> = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (gender) updateData.gender = gender;
        if (birthdate) updateData.birthdate = birthdate;
        if (phone) updateData.phone = phone;

        const updatedUser = await updateUserById(id, updateData);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}