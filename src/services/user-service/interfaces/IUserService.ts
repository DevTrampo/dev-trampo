import ICreateUserDTO from '@repositories/user-repository/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@repositories/user-repository/dtos/IUpdateUserDTO';
import IUserDTO from '@repositories/user-repository/dtos/IUserDTO';

export default interface IUserService {
  getUserById(userId: number): Promise<IUserDTO>;
  createUser(createUserDTO: ICreateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
}
