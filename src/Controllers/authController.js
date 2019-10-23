import User from '../Models/User';

export const getGoogleCallback = async (req, res) => {
    const io = req.app.get('io');
    const {
        user: {
            id,
            name: { givenName: name }
        }
    } = req;
    try {
        if ((await User.find({ id })).length === 0) {
            const userModel = new User({ id, name });
            userModel.save();
        }
        io.in(req.session.socketId).emit('google', { id, name });
    } catch (e) {
        console.log(e);
        io.in(req.session.socketId).emit('google', {});
    }
};

export const getFacebookCallback = (req, res) => {
    const io = req.app.get('io');
    const { givenName, familyName } = req.user.name;
    const user = {
        name: `${givenName} ${familyName}`
    };
    /*
    도큐먼트 생성 추가해야됨
    */
    io.in(req.session.socketId).emit('facebook', user);
};
