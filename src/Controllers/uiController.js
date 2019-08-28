import Girl from '../Models/Girl';
import Task from '../Models/Task';
import Tag from '../Models/Tag';
import Instagram from '../Models/Instagram';
import { createTask } from './taskController';

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({})
            .sort({ _id: -1 })
            .limit(20)
            .populate({
                path: 'instagram',
                populate: {
                    path: 'girl',
                },
            });
        res.render('task', { tasks });
    } catch (e) {
        console.log(e);
        res.render('task');
    }
};

export const getGirl = async (req, res) => {
    try {
        const girls = await Girl.find({})
            .sort({ _id: -1 })
            .limit(20)
            .populate('instagram');
        const tags = await Tag.find();
        res.render('girl', { girls, tags });
    } catch (e) {
        console.log(e);
        res.render('girl');
    }
};

export const postGirl = async (req, res) => {
    const { name, nickname, instagramId } = req.body;
    try {
        if (name === '' || nickname === '' || instagramId === '') throw 'blank';
        if (await Instagram.findOne({ id: instagramId })) throw 'same thing';
        const instagram = new Instagram({ id: instagramId });
        const girl = new Girl({
            name,
            nickname,
            instagram,
            like: 0,
        });
        girl.save();
        instagram.save();

        createTask(instagram);

        res.redirect('/ui/girl');
    } catch (e) {
        console.log(e);
        res.redirect('/ui/girl');
    }
};

export const postGirlTags = async (req, res) => {
    const { girl } = req.query;
    const { tags } = req.body;
    try {
        await Girl.findByIdAndUpdate(girl, { tags }, { new: true });
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
