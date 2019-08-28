import { Router } from 'express';

const testRouter = new Router();

testRouter.get('/', () => console.log('hello'));

export default testRouter;
