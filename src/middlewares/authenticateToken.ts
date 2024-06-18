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

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { email: string, _id: string };
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};

export default authenticateToken;
