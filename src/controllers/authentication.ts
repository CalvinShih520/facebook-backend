import express from "express";
import { check, validationResult } from 'express-validator';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';
import jwt from 'jsonwebtoken';

let refreshTokens: string[] = [];

export const token = async (req: express.Request, res: express.Response) => {
    //const refreshToken = req.header("x-auth-token");
    const refreshToken = req.body.refreshToken;
    // 如果未提供令牌，发送错误消息
    if (!refreshToken) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Token not found",
                },
            ],
        });
    }

    // 如果refreshToken不在refreshTokens数组中，发送错误消息
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({
            errors: [
                {
                    msg: "Invalid refresh token",
                },
            ],
        });
    }

    // 验证refreshToken
    try {
        const user = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        ) as { email: string };

        // 生成新的accessToken
        const accessToken = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        );

        // 发送新的accessToken
        res.json({ accessToken });
    } catch (error) {
        return res.status(403).json({
            errors: [
                {
                    msg: "Invalid refresh token",
                },
            ],
        });
    }
}


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHsh = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHsh) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.id.toString());

        

        // Send JWT access token
        const accessToken = await jwt.sign(
            { email , _id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "30s",
            }
        );

        // Refresh token
        const refreshToken = await jwt.sign(
            { email , _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1m",
            }
        );
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();

        // Set refersh token in refreshTokens array
        refreshTokens.push(refreshToken);

        res.cookie('CALVIN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json({
            user,
            accessToken,
            refreshToken
        }).end();



    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const signup = [
    // 验证输入
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 6 chars long').isLength({ min: 6 }),
    check('username', 'Username is required').notEmpty(),

    async (req: express.Request, res: express.Response) => {
        try {
            // 处理验证结果
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, username } = req.body;

            const existingUser = await getUserByEmail(email);

            if (existingUser) {
                // 422 Unprocessable Entity: server understands the content type of the request entity
                // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
                return res.status(200).json({
                    errors: [
                        {
                            email: existingUser.email,
                            msg: "The user already exists",
                        },
                    ],
                });
            }

            const salt = random();
            
            // 生成访问令牌
            const accessToken = await jwt.sign(
                { email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "10s",
                }
            );
            const refreshToken = jwt.sign(
                { email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1m" }
            );

            refreshTokens.push(refreshToken);

            const user = await createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                },
                accessToken,
                refreshToken,
            });

            return res.status(200).json({
                user,
                accessToken,
                refreshToken
            }).end();

        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
];

export const logout = (req: express.Request, res: express.Response) => {
    const refreshToken = req.header("x-auth-token");

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    // 从 refreshTokens 数组中移除当前用户的 refresh token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

    return res.status(200).json({ message: "Logged out successfully" });
};