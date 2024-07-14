import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 加载 .env 文件
dotenv.config();
import router from './router/index'; 

const app = express();

// 使用环境变量的端口，默认为 8080
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'https://facebook.zeabur.app', // 替换为你的前端应用 URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, x-auth-token'
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

// 使用环境变量的 MongoDB 连接字符串
const MONGO_URL = process.env.MONGO_URL;

//const MONGO_URL = 'mongodb+srv://calvin:fuckyou88@cluster0.9l3viuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error: Error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

app.use('/', router());