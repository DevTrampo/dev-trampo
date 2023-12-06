import { Router } from 'express';
import UserController from '@controllers/UserController';
import UserServiceImpl from '@services/user-service/UserServiceImpl';
import UserRepositoryImpl from '@repositories/user-repository/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get('/:id', userController.getById.bind(userController));
userRouter.get('/', userController.getAll.bind(userController));
userRouter.post('/', userController.create.bind(userController));
userRouter.put('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));

export default userRouter;
