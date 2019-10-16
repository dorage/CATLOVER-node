import bodyParser from 'body-parser';
import cors from 'cors';
import connetMongo from 'connect-mongo';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import session from 'express-session';
import https from 'https';
import fs from 'fs';
import path from 'path';
import io from 'socket.io';

import './db';
import uiRouter from './Routers/uiRouter';
import apiRouter from './Routers/apiRouter';
import taskRouter from './Routers/taskRouter';
import { Routine, updateTagList, localsMiddleware } from './middlewares';

const app = express();
const certOptions = {
    key: fs.readFileSync(path.resolve('cert/private.pem')),
    cert: fs.readFileSync(path.resolve('cert/cert.pem')),
    passphrase: 'ener720713'
};
const httpsServer = https.createServer(certOptions, app);
const MongoStore = connetMongo(session);

// template enginne
app.set('view engine', 'pug');
// socket io
app.set('io', io);

// middlewares
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
            ttl: 60 * 60 * 1000,
            mongooseConnection: mongoose.connection
        }),
        cookie: {
            expires: false,
            maxAge: 60 * 60 * 1000
        }
    })
);

// Routines
Routine(updateTagList, 60 * 60 * 1000); // 1 hour

// static
app.use('/static', express.static(`${__dirname}/../static`));
// local middleware
app.use(localsMiddleware);

// router
app.use('/api', apiRouter);
app.use('/task', taskRouter);
app.use('/ui', uiRouter);

export default app;
