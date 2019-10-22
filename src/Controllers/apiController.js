import Post from '../Models/Post';
import Instagram from '../Models/Instagram';
import Girl from '../Models/Girl';
import User from '../Models/User';
import Tag from '../Models/Tag';
import TagList from '../Models/TagList';
import { verifyIdToken } from './authController';
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
        const post = await Post.find({ isImage: true })
            .sort({ like: -1 })
            .limit(10);
        /*
        const postRank = post.map(async elem => ({
            _id: elem._id,
            like: await postLikeCount(elem._id),
            link: elem.link
        }));
        const postResults = await Promise.all(postRank);
        */
        const girl = await Girl.find({})
            .sort({ like: -1 })
            .limit(10);
        /*
        const girlRank = girl.map(async elem => ({
            _id: elem._id,
            like: await girlLikeCount(elem._id),
            name: elem.name
        }));
        const girlResults = await Promise.all(girlRank);
        */
        res.send({ results: { post, girl } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostLike = async (req, res) => {
    const { tokenId } = req.query;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!tokenId) {
            res.send({ isLike: false, like: post.like });
            return;
        }
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        if (user.posts) {
            res.send({
                isLike: user.posts.includes(id),
                like: post.like
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
        const girl = await Girl.findById(id);
        if (!tokenId) {
            res.send({ isLike: false, like: girl.like });
            return;
        }

        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        if (user.girls) {
            res.send({
                isLike: user.girls.includes(id),
                like: girl.like
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

    let originalLike = -1;

    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const post = await Post.findOne({ _id: id });
        originalLike = post.like;

        if (user.posts && user.posts.includes(post._id)) {
            DPrint('pull');
            post.like--;
            post.save();
            user.posts.pull(post);
            user.save();
        } else {
            DPrint('push');
            post.like++;
            post.save();
            user.posts.push(post);
            user.save();
        }
        next();
    } catch (e) {
        // like가 변경되었을때 원래대로 변경
        if (originalLike !== -1) {
            const post = await Post.findOne({ _id: id });
            if (originalLike !== post.like) {
                post.like = originalLike;
                post.save();
            }
        }
        console.log(e);
        res.sendStatus(412);
    }
};
export const postGirlLike = async (req, res, next) => {
    const { tokenId } = req.query;
    const { id } = req.params;

    let originalLike = -1;
    try {
        const { name, email } = await verifyIdToken(tokenId);
        const user = await User.findOne({ name, email });
        const girl = await Girl.findOne({ _id: id });
        originalLike = girl.like;

        if (user.girls && user.girls.includes(girl._id)) {
            girl.like--;
            girl.save();
            user.girls.pull(girl);
            user.save();
        } else {
            girl.like++;
            girl.save();
            user.girls.push(girl);
            user.save();
        }
        next();
    } catch (e) {
        // like가 변경되었을때 원래대로 변경
        if (originalLike !== -1) {
            const girl = await Girl.findOne({ _id: id });
            if (originalLike !== girl.like) {
                girl.like = originalLike;
                girl.save();
            }
        }
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
