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
            { _id: true, images: true },
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

        const postRank = post.map(async elem => ({
            _id: elem._id,
            like: await PostLike.count(elem._id),
            link: elem.link,
        }));
        const postResults = await Promise.all(postRank);

        const girl = await Girl.find({})
            .sort({ like: -1 })
            .limit(10);
        const girlRank = girl.map(async elem => ({
            _id: elem._id,
            like: await GirlLike.count(elem._id),
            name: elem.name,
        }));
        const girlResults = await Promise.all(girlRank);

        res.send({ results: { post: postResults, girl: girlResults } });
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};

export const getPostLike = async (req, res) => {
    const { userId } = req.query;
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        const like = await PostLike.count({ post });
        if (!userId) {
            res.send({ isLike: false, like });
            return;
        }
        const user = await User.findOne({ id: userId });
        const postLike = await PostLike.findOne({ user, post });
        if (postLike) {
            res.send({
                isLike: true,
                like,
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
        const like = await GirlLike.count({ girl });
        if (!userId) {
            res.send({ isLike: false, like });
            return;
        }
        const user = await User.findOne({ id: userId });
        const girlLike = await GirlLike.findOne({ user, girl });
        if (girlLike) {
            res.send({
                isLike: true,
                like,
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
        const user = await User.findOne({ id: userId });
        const post = await Post.findOne({ _id: id });
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
        const user = await User.findOne({ name, email });
        const girl = await Girl.findOne({ _id: id });
        let girlLike = await GirlLike.findOne({ name });
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
