import { Router } from 'express';
import passport from 'passport';
import {
    getGoogleCallback,
    getFacebookCallback,
    getCookieSignIn,
    getCookieSignOut,
} from '../Controllers/authController';

const googleAuth = passport.authenticate('google', { scope: ['profile'] });
const facebookAuth = passport.authenticate('facebook');

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};

const router = new Router();

router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

router.get('/google/callback', googleAuth, getGoogleCallback);
router.get('/facebook/callback', facebookAuth, getFacebookCallback);

router.get('/cookie-signin', getCookieSignIn);
router.get('/cookie-signout', getCookieSignOut);

export default router;
