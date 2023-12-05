import { Router } from 'express';
import userRouter from './user.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

routes.use('/user', userRouter);

export default routes;
