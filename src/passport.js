import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { googleConfig, facebookConfig } from './config';

const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(new GoogleStrategy(googleConfig, callback));
passport.use(new FacebookStrategy(facebookConfig, callback));
