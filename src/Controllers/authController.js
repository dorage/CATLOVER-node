import User from '../Models/User';

export const getGoogleCallback = async req => {
    const io = req.app.get('io');
    const {
        user: {
            id: googleId,
            name: { givenName: name }
        },
        session: { socketId }
    } = req;
    try {
        let user = await User.find({ name, googleId });
        // 유저 생성
        if (user.length === 0) {
            user = new User({ name, googleId, socketId });
            user.save();
        } else {
            user.socketId = socketId;
            user.save();
        }
        // 클라이언트 전달
        io.in(req.session.socketId).emit('google', { name });
    } catch (e) {
        console.log(e);
        io.in(req.session.socketId).emit('google', {});
    }
};

export const getFacebookCallback = req => {
    const io = req.app.get('io');
    const { givenName, familyName } = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`
    };
    // 유저 생성
    io.in(req.session.socketId).emit('facebook', user);
};

export const getCookieSignIn = async (req, res) => {
    const { socketId } = req.query;
    req.session.socketId = socketId;
    const io = req.app.get('io');
    const name = 'kang';
    io.in(socketId).emit('google', { name });
    res.send({ socketId });
};

export const getCookieSignOut = (req, res) => {
    req.session.userId;
};
