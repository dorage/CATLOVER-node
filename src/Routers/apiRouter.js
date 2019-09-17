import { Router } from 'express';
import {
    getTodayPick,
    getPostDetail,
    getGirlDetail,
    getGirlRank,
    getPostRank,
    getTotalRank,
    getGirlLike,
    getPostLike,
    postGirlLike,
    postPostLike,
    getTags,
    getTagDetail,
    getAPI
} from '../Controllers/apiController';
import { postAuth, getUser, getValidate } from '../Controllers/authController';

const apiRouter = new Router();

// test
apiRouter.get('/', getAPI);
// main 화면 사진 20장 choice
apiRouter.get('/todaypick', getTodayPick);
// detail
apiRouter.get('/girl/:id', getGirlDetail);
apiRouter.get('/post/:id', getPostDetail);
// like
apiRouter.get('/girl/:id/like', getGirlLike);
apiRouter.get('/post/:id/like', getPostLike);
apiRouter.post('/girl/:id/like', postGirlLike, getGirlLike);
apiRouter.post('/post/:id/like', postPostLike, getPostLike);
// ranks
apiRouter.get('/total/rank', getTotalRank);
// auth
apiRouter.get('/auth/validate', getValidate);
apiRouter.post('/auth/login', postAuth);
apiRouter.get('/auth/user', getUser);
// tags
apiRouter.get('/tags', getTags);
apiRouter.get('/tags/:name', getTagDetail);

export default apiRouter;
