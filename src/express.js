import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import taskRouter from './Routers/taskRouter';

import './db';
import uiRouter from './Routers/uiRouter';
import apiRouter from './Routers/apiRouter';
import { Routine, updateTagList } from './middlewares';

const app = express();

// template enginne
app.set('view engine', 'pug');

// middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routines
Routine(updateTagList, 60 * 60 * 1000); // 1 hour

app.use('/static', express.static(`${__dirname}/../static`));

// router
app.use('/api', apiRouter);
app.use('/task', taskRouter);
app.use('/ui', uiRouter);

export default app;
