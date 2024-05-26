import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 从请求头中获取 token
    const token = req.header("x-auth-token");

    // 如果没有找到 token，发送错误消息
    if (!token) {
      return res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }

    // 验证 token
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { email: string }; // 注意类型断言

    // 将用户信息添加到请求对象中
    req.user = user.email;

    // 继续执行下一个中间件或路由处理程序
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "Invalid or expired access token",
        },
      ],
    });
  }
};

export default authenticateToken;
