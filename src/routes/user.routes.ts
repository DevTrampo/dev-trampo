import { Router } from 'express';
import UserService from '@services/user-service/UserService';
import UserController from '@controllers/UserController';
import UserRepositoryImpl from '@repositories/user-repository/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get('/:id', userController.getById.bind(userController));
userRouter.post('/', userController.create.bind(userController));

export default userRouter;
