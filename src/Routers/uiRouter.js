import { Router } from 'express';
import {
    getTask,
    getGirl,
    postGirl,
    getTags,
    postTags,
    deleteTag,
    postGirlTags,
} from '../Controllers/uiController';

const uiRouter = new Router();

uiRouter.get('/', getTask);
uiRouter.get('/task', getTask);

uiRouter.get('/girl', getGirl);
uiRouter.post('/girl', postGirl);
uiRouter.post('/girl/tag', postGirlTags);

uiRouter.get('/post');
uiRouter.post('/post');

uiRouter.get('/tags', getTags);
uiRouter.post('/tags', postTags);
uiRouter.delete('/tags', deleteTag);

export default uiRouter;
