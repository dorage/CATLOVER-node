import routes from './routes';
import Task from './Models/Task';
import { Response } from './jsons';

export const localsMiddlewares = (req, res, next) => {
    res.locals.routes = routes;
    next();
};

export const DPrint = (text) => {
    if (process.env.NODE_ENV === 'development') console.log(text);
};

// crawler가 받아갈때 task에 있던 내용을 항상 삭제
export const checkCrawler = async (req, res, next) => {
    const { crawler } = req.query;
    const task = await Task.find({ crawler });
    DPrint(task.length);

    if (!task.length) next();
    else res.send(Response.error('you have another task'));
};

export const Routine = () => {
    update();
    setTimeout(Routine, 24 * 60 * 60 * 1000);
};
