import Task from '../Models/Task';
import Post from '../Models/Post';
import { DPrint } from '../middlewares';
import { taskState } from '../var';
import { Response } from '../jsons';

// 처음 girl 모델 생성시 task 모델 동시 생성
export const createTask = (instagram) => {
    DPrint('[createTask()] Start');
    const task = new Task({
        state: taskState.pending,
        instagram,
        crawler: undefined,
    });
    task.save();
    DPrint('[createTask()] End');
};

export const getTask = async (req, res) => {
    // crawler name
    const { crawler } = req.query;
    // girl 정보를 받아옴
    try {
        const task = await Task.findOne({ state: taskState.pending })
            .sort({ id: -1 })
            .populate({
                path: 'instagram',
            });
        if (task === undefined) res.send(Response.noTask);
        // update task
        task.state = taskState.crawling;
        task.crawler = crawler;
        task.save();

        res.send(task);
    } catch (e) {
        res.send(Response.error(e));
    }
};

export const postTask = async (req, res) => {
    // stringfy 된 json object임
    const { crawler, strData } = req.body;
    const jsonData = JSON.parse(strData);
    try {
        const task = await Task.findOne({
            crawler,
            state: taskState.crawling,
        }).populate({
            path: 'instagram',
            populate: { path: 'posts' },
        });
        // task 가 없을시 실패 반환
        if (task === undefined) res.send(Response.forcedResetTask);
        task.state = taskState.done;
        task.crawler = undefined;
        task.updatedDate = new Date();
        jsonData.posts.forEach((element) => {
            const { link, images, isImage } = element;
            const post = new Post({
                link,
                images,
                isImage,
                like: 0,
            });
            task.instagram.posts.push(post);
            post.save();
        });
        task.instagram.save();
        task.save();
        res.send(Response.successful);
    } catch (e) {
        res.send(Response.error(e));
    }
};

export const resetTask = async (req, res) => {
    const { id } = req.query;
    try {
        const task = await Task.findById(id);
        task.state = taskState.pending;
        task.crawler = undefined;
        task.save();
        res.send(Response.successful);
    } catch (e) {
        res.send(Response.error(e));
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.query;
    try {
        await Task.findByIdAndDelete(id);
        console.log(`Task ${id} is deleted`);
        res.send(Response.successful);
    } catch (e) {
        console.log(e);
        res.send(Response.error(e));
    }
};