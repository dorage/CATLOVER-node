import { Router } from 'express';
import {
    getTop20,
    getPostDetail,
    getGirlDetail,
    getGirlRank,
    getPostRank,
    getTotalRank,
    getGirlLike,
    getPostLike,
    postGirlLike,
    postPostLike,
} from '../Controllers/apiController';
import { postAuth, getUser, getValidate } from '../Controllers/authController';

const apiRouter = new Router();

// main 화면 사진 20장 choice
apiRouter.get('/top20', getTop20);
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
apiRouter.get('/girl/rank', getGirlRank);
apiRouter.get('/post/rank', getPostRank);
// auth
apiRouter.get('/auth/validate', getValidate);
apiRouter.post('/auth/login', postAuth);
apiRouter.get('/auth/user', getUser);
// getMainGirls

export default apiRouter;
