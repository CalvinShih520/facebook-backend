import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () =>{
    console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb+srv://calvin:fuckyou88@cluster0.9l3viuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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