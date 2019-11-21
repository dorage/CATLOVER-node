import bodyParser from 'body-parser';
import cors from 'cors';
import connetMongo from 'connect-mongo';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import session from 'express-session';
/*
import https from 'https';
import fs from 'fs';
import path from 'path';
*/
import http from 'http';
import socketIo from 'socket.io';
import passport from 'passport';
import authRouter from './Routers/authRouter';
import uiRouter from './Routers/uiRouter';
import apiRouter from './Routers/apiRouter';
import taskRouter from './Routers/taskRouter';
import { Routine, updateTagList, localsMiddleware } from './middlewares';

import './passport';
import './db';

dotenv.config();

const app = express();
/* HTTPS
const certOptions = {
    key: fs.readFileSync(path.resolve('cert/private.pem')),
    cert: fs.readFileSync(path.resolve('cert/cert.pem')),
    passphrase: 'ener720713'
};
const httpsServer = https.createServer(certOptions, app);
*/
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
const MongoStore = connetMongo(session);

const hour = 60 * 60 * 1000;

app.set('view engine', 'pug');
app.set('io', io);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(
    session({
        secret: 'catlover-session',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            ttl: hour,
            mongooseConnection: mongoose.connection,
        }),
        cookie: {
            expires: new Date(Date.now() + hour),
            maxAge: hour,
        },
    }),
);
app.use(passport.initialize());

// Routines
Routine(updateTagList, 60 * 60 * 1000); // 1 hour

// static
app.use('/static', express.static(`${__dirname}/../static`));
// local middleware
app.use(localsMiddleware);

// router
app.use('/', authRouter);
app.use('/api', apiRouter);
app.use('/task', taskRouter);
app.use('/ui', uiRouter);

export default httpServer;
