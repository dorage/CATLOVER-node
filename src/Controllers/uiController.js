import Admin from '../models/Admin';
import Girl from '../models/Girl';
import Task from '../models/Task';
import Post from '../models/Post';
import Tag from '../models/Tag';
import TagList from '../models/TagList';
import Instagram from '../models/Instagram';
import { createTask } from './taskController';

export const getLogin = async (req, res) => {
    res.render('login');
};
export const postLogin = async (req, res, next) => {
    const { id } = req.body;
    try {
        const admin = await Admin.findOne({ id });
        if (admin) {
            const session = req.session;
            session.user = admin;
        }
        res.redirect('/ui');
    } catch (e) {
        next();
    }
};

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
            .sort({ _id: -1 })
            .limit(20)
            .populate({
                path: 'instagram',
                populate: {
                    path: 'girl'
                }
            });
        res.render('task', { tasks });
    } catch (e) {
        console.log(e);
        res.render('task');
    }
};

export const getGirl = async (req, res) => {
    const { page } = req.query;
    try {
        const results = [];
        // 총 애완동물 / 20 - 한 페이지 20
        const totalPages = Math.ceil((await Girl.countDocuments()) / 20);
        let girls = null;
        // page 처리
        if (Number(page) && Number(page) <= totalPages)
            girls = await Girl.find({})
                .sort({ _id: -1 })
                .skip(20 * (Number(page) - 1))
                .limit(20);
        else
            girls = await Girl.find({})
                .sort({ _id: -1 })
                .limit(20);
        for (let i = 0; i < girls.length; i++) {
            const instagram = await Instagram.find(
                { girl: girls[i] },
                { id: true, profile: true }
            );
            results.push({ girl: girls[i], instagram: instagram });
        }
        //.populate('instagram');
        const tags = await Tag.find();
        res.render('girl', { results, tags, totalPages });
    } catch (e) {
        console.log(e);
        res.render('girl');
    }
};

export const postGirl = async (req, res) => {
    const { name, nickname, instagramId } = req.body;
    const { pages } = req.query;
    try {
        if (name === '' || nickname === '' || instagramId === '') throw 'blank';
        if (await Instagram.findOne({ id: instagramId })) throw 'same thing';

        let girl = await Girl.findOne({ name, nickname });
        if (!girl)
            girl = new Girl({
                name,
                nickname,
                like: 0
            });

        const instagram = new Instagram({ id: instagramId, girl });

        girl.save();
        instagram.save();

        createTask(instagram);
        if (pages) res.redirect(`/ui/girl?pages=${pages}`);
        else res.redirect(`/ui/girl`);
    } catch (e) {
        console.log(e);
        if (pages) res.redirect(`/ui/girl?pages=${pages}`);
        else res.redirect(`/ui/girl`);
    }
};

export const postGirlTags = async (req, res) => {
    const { girl: girlId } = req.query;
    const { tags } = req.body;
    try {
        await Girl.findByIdAndUpdate(girlId, { tags }, { new: true });
        res.redirect('/ui/girl');
    } catch (e) {
        console.log(e);
        res.redirect('/ui/girl');
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({}).sort({ _id: -1 });
        res.render('tags', { tags });
    } catch (e) {
        console.log(e);
        res.render('tags');
    }
};

export const postTags = async (req, res) => {
    const { name } = req.body;
    if (name === '') throw 'blank';
    if (await Tag.findOne({ name })) throw 'same thing';
    try {
        const tag = new Tag({ name });
        tag.save();
        res.redirect('/ui/tags');
    } catch (e) {
        console.log(e);
        res.redirect('/ui/tags');
    }
};

export const deleteTag = async (req, res) => {
    const { id } = req.query;
    await Tag.findByIdAndDelete(id);
    console.log(`deleted ${id}`);
};
