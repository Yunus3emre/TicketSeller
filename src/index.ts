import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';


const app = express();

app.use (cors({
credentials:true,
}));

app.use (compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://local host 8080/');
});

const Mongo_URL = 'mongodb+srv://yunusemreayan00:xP3sCza4LpI7rkpA@cluster0.hckf2pj.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(Mongo_URL);
mongoose.connection.on('error',(error:Error) => console.log(error));

app.use('/',router());