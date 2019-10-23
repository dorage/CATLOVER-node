import { Router } from 'express';
import passport from 'passport';
import {
    getGoogleCallback,
    getFacebookCallback,
} from '../controllers/authController';

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

export default router;
