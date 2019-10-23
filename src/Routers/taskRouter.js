import { Router } from './node_modules/express';
import {
    getTask,
    postTask,
    resetTask,
    deleteTask,
} from '../Controllers/taskController';

const taskRouter = new Router();

taskRouter.get('/', getTask);
taskRouter.post('/', postTask);
taskRouter.delete('/', deleteTask);
taskRouter.get('/reset', resetTask);

export default taskRouter;
