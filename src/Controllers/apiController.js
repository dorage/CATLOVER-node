/* eslint-disable no-underscore-dangle */
import Post from '../Models/Post';
import Instagram from '../Models/Instagram';
import Girl from '../Models/Girl';
import User from '../Models/User';
import Tag from '../Models/Tag';
import TagList from '../Models/TagList';
import { PostLike, GirlLike } from '../Models/Like';
import { DPrint, shuffleArray } from '../middlewares';

export const getAPI = (req, res) => {
    res.send({ greeting: 'hello' });
};

export const getTodayPick = async (req, res) => {
    try {
        let todayPick = await Post.find(
            { isImage: true },
            { _id: true, images: true }
        )
            .sort({ id: -1 })
            .limit(20);
        todayPick = shuffleArray(todayPick);
        res.send({ results: { todayPick } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        const instagram = await Instagram.findById(post.instagram);
        const girl = await Girl.findById(post.girl).populate('tags');
        res.send({ results: { post, instagram, girl } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getGirlDetail = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;
    try {
        const girl = await Girl.findById(id).populate('tags');
        const instagram = await Instagram.find({ girl });
        const cntPost = await Post.countDocuments();
        let endOfPage = false;
        let post = null;
        if (Number(page) === -1) {
            // 기본페이지
            post = await Post.find({ girl, isImage: true }).limit(20);
        } else if (Number(page) * 20 - 19 > cntPost) {
            // 추가페이지가 초과되었을때
            endOfPage = true;
        } else {
            post = await Post.find({ girl, isImage: true })
                .skip(20 * (Number(page) - 1))
                .limit(20);
        }
        res.send({ results: { girl, instagram, post }, endOfPage });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getTotalRank = async (req, res) => {
    try {
        const postRank = await PostLike.aggregate([
            { $group: { _id: '$post', like: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]).limit(10);
        const postsPromise = postRank.map(async elem => {
            const post = await Post.findById(elem._id, { link: true });
            return { _id: post._id, link: post.link, like: elem.like };
        });
        const posts = await Promise.all(postsPromise);

        const girlRank = await GirlLike.aggregate([
            { $group: { _id: '$girl', like: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]).limit(10);
        const girlsPromise = girlRank.map(async elem => {
            const girl = await Girl.findById(elem._id, { name: true });
            return { _id: girl._id, name: name, like: elem.like };
        });
        const girls = await Promise.all(girlsPromise);

        res.send({ results: { posts, girls } });
    } catch (e) {
        console.log(e);
        res.send({ e });
    }
};

export const getPostLike = async (req, res) => {
    const { userId } = req.query;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        const like = await PostLike.countDocuments({ post });
        if (!userId) {
            res.send({ isLike: false, like });
            return;
        }
        const user = await User.findById(userId);
        const postLike = await PostLike.findOne({ user, post });
        if (postLike) {
            res.send({
                isLike: true,
                like
            });
        } else {
            res.send({ isLike: false, like });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const getGirlLike = async (req, res) => {
    const { userId } = req.query;
    const { id } = req.params;
    try {
        const girl = await Girl.findById(id);
        const like = await GirlLike.countDocuments({ girl });
        if (!userId) {
            res.send({ isLike: false, like });
            return;
        }
        const user = await User.findById(userId);
        const girlLike = await GirlLike.findOne({ user, girl });
        if (girlLike) {
            res.send({
                isLike: true,
                like
            });
        } else {
            res.send({ isLike: false, like });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const postPostLike = async (req, res, next) => {
    const { userId } = req.query;
    const { id } = req.params;

    try {
        const user = await User.findById(userId);
        const post = await Post.findById(id);
        let postLike = await PostLike.findOne({ user, post });
        if (postLike) {
            await PostLike.deleteOne({ user, post });
        } else {
            postLike = new PostLike({ user, post });
            postLike.save();
        }
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};
export const postGirlLike = async (req, res, next) => {
    const { userId } = req.query;
    const { id } = req.params;

    try {
        const user = await User.findById(userId);
        const girl = await Girl.findById(id);
        let girlLike = await GirlLike.findOne({ user, girl });
        if (girlLike) {
            await GirlLike.deleteOne({ user, girl });
        } else {
            girlLike = new GirlLike({ user, girl });
            girlLike.save();
        }
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.send({ results: { tags } });
    } catch (e) {
        console.log(e);
        res.sendStatus(412);
    }
};

export const getTagDetail = async (req, res) => {
    const { name } = req.params;
    const { page } = req.query;
    try {
        const tag = await Tag.findOne({ name });
        const tagList = await TagList.findOne({ tag }).populate('posts');
        const cntPost = tagList.posts.length;
        let endOfPage = false;
        let posts = null;
        if (Number(page) === -1) {
            // 기본페이지
            posts = tagList.posts.slice(0, 20);
        } else if (Number(page) * 20 - 19 > cntPost) {
            // 추가페이지가 초과되었을때
            endOfPage = true;
        } else {
            const start = (page - 1) * 20;
            const end = page * 20;
            posts = tagList.posts.slice(start, end);
        }
        res.send({ results: { posts }, endOfPage });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};
