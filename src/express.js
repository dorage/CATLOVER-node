import bodyParser from 'body-parser';
import cors from 'cors';
import connetMongo from 'connect-mongo';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import session from 'express-session';

import './db';
import uiRouter from './Routers/uiRouter';
import apiRouter from './Routers/apiRouter';
import taskRouter from './Routers/taskRouter';
import { Routine, updateTagList, localsMiddleware } from './middlewares';

const app = express();
const MongoStore = connetMongo(session);

// template enginne
app.set('view engine', 'pug');

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

app.use('/static', express.static(`${__dirname}/../static`));
app.use(localsMiddleware);

// router
app.use('/api', apiRouter);
app.use('/task', taskRouter);
app.use('/ui', uiRouter);

export default app;
