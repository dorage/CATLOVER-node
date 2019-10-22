import Post from '../Models/Post';
import Instagram from '../Models/Instagram';
import Girl from '../Models/Girl';
import User from '../Models/User';
import { fail } from 'assert';

export const getGoogleCallback = (req, res) => {
    const io = req.app.get('io');
    const user = {
        id: req.user.id,
        name: req.user.displayName
    };
    io.in(req.session.socketId).emit('google', user);
};

export const getFacebookCallback = (req, res) => {
    const io = req.app.get('io');
    const { givenName, familyName } = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`
    };
    io.in(req.session.socketId).emit('facebook', user);
};
