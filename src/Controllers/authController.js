import User from '../Models/User';

export const getGoogleCallback = async req => {
    const io = req.app.get('io');
    const {
        user: {
            id,
            name: { givenName: name }
        }
    } = req;
    try {
        // 유저 생성
        if ((await User.find({ name, googleId: id })).length === 0) {
            const userModel = new User({ name, googleId: id });
            userModel.save();
        }
        // session 에 저장
        const user = await User.find({ name, googleId: id });
        req.session.userId = user._id;
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

export const getCookieSignIn = (req, res) => {
    const { userId, socketId } = req.session;
    res.send({ userId, socketId });
};

export const getCookieSignOut = (req, res) => {
    req.session.userId;
};
