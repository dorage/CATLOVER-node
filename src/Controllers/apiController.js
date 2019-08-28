import { OAuth2Client } from 'google-auth-library';
import Post from '../Models/Post';
import Instagram from '../Models/Instagram';
import Girl from '../Models/Girl';
import User from '../Models/User';
import { verifyIdToken } from './authController';

export const getTop20 = async (req, res) => {
    try {
        const top20 = await Post.find(
            { isImage: true },
            { _id: true, images: true },
        )
            .sort({ id: -1 })
            .limit(20);
        res.send({ results: { top20 } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ _id: id }).populate('tags');
        const instagram = await Instagram.findOne({ posts: post });
        const girl = await Girl.findOne({ instagram }).populate('tags');
        res.send({ results: { post, instagram, girl } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getGirlDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const girl = await Girl.findById(id)
            .populate('instagram')
            .populate('tags');
        res.send({ results: { girl } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getTotalRank = async (req, res) => {
    try {
        const post = await Post.find({ isImage: true })
            .sort({ like: -1 })
            .limit(10);
        const girl = await Girl.find({})
            .sort({ like: -1 })
            .limit(10);
        res.send({ results: { post, girl } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getGirlRank = async (req, res) => {
    try {
        const rank = await Girl.find({})
            .sort({ like: -1 })
            .limit(10);
        res.send({ results: { rank } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostRank = async (req, res) => {
    try {
        const rank = await Post.find({ isImage: true })
            .sort({ like: -1 })
            .limit(10);
        res.send({ results: { rank } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostLike = async (req, res) => {
    const { tokenId } = req.query;
    const { id } = req.params;
    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const post = await Post.findOne({ _id: id });
        if (user.posts) {
            res.send({
                isLike: user.posts.includes(post._id),
                like: post.like,
            });
        } else {
            res.send({ isLike: false, like: post.like });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const getGirlLike = async (req, res) => {
    const { tokenId } = req.query;
    const { id } = req.params;
    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const girl = await Girl.findOne({ _id: id });
        if (user.girls) {
            res.send({
                isLike: user.girls.includes(girl._id),
                like: girl.like,
            });
        } else {
            res.send({ isLike: false, like: girl.like });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const postPostLike = async (req, res, next) => {
    const { tokenId } = req.query;
    const { id } = req.params;
    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const post = await Post.findOne({ _id: id });
        if (user.posts && user.posts.includes(post._id)) {
            console.log('pull');
            user.posts.pull(post);
            user.save();
            post.like -= 1;
            post.save();
        } else {
            console.log('push');
            user.posts.push(post);
            user.save();
            post.like += 1;
            post.save();
        }
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};
export const postGirlLike = async (req, res, next) => {
    const { tokenId } = req.query;
    const { id } = req.params;
    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const girl = await Girl.findOne({ _id: id });
        if (user.girls && user.girls.includes(girl._id)) {
            console.log('pull');
            user.girls.pull(girl);
            user.save();
            girl.like -= 1;
            girl.save();
        } else {
            console.log('push');
            user.girls.push(girl);
            user.save();
            girl.like += 1;
            girl.save();
        }
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};
