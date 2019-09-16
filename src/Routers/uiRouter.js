import { Router } from 'express';
import {
    getTask,
    getGirl,
    postGirl,
    getTags,
    postTags,
    deleteTag,
    postGirlTags,
    makeTagList,
    getLogin,
    postLogin
} from '../Controllers/uiController';
import { requiredLogin, noRequiredLogin } from '../middlewares';

const uiRouter = new Router();

uiRouter.get('/', requiredLogin, getTask);

uiRouter.get('/login', noRequiredLogin, getLogin);
uiRouter.post('/login', noRequiredLogin, postLogin);

uiRouter.get('/task', requiredLogin, getTask);

uiRouter.get('/girl', requiredLogin, getGirl);
uiRouter.post('/girl', requiredLogin, postGirl);
uiRouter.post('/girl/tag', requiredLogin, postGirlTags);

uiRouter.get('/tags', requiredLogin, getTags);
uiRouter.post('/tags', requiredLogin, postTags);
uiRouter.delete('/tags', requiredLogin, deleteTag);

export default uiRouter;
