import { OAuth2Client } from 'google-auth-library';
import Post from '../Models/Post';
import Instagram from '../Models/Instagram';
import Girl from '../Models/Girl';
import User from '../Models/User';

export const verifyIdToken = async tokenId => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: CLIENT_ID
    });

    return ticket.getPayload();
};

export const getValidate = async (req, res) => {
    const { tokenId } = req.query;
    try {
        const { sub: userid } = await verifyIdToken(tokenId);
        const user = await User.findOne({ userid });
        res.send({ results: { user } });
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const postAuth = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const { name, email, sub: userid } = await verifyIdToken(tokenId);

        let user = await User.findOne({ userid });
        if (!user) {
            user = new User({ email, name, userid });
            user.save();
        }
        res.send({ results: { user } });
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const getUser = async (req, res) => {
    const { tokenId } = req.query;
    try {
        const { name, email, sub: userid } = await verifyIdToken(tokenId);

        let user = await User.findOne({ userid });
        if (!user) {
            user = new User({ email, name, userid });
            user.save();
        }
        res.send({ results: { user } });
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};
