import IPaginationParams from '@common/interfaces/IPaginationParams';
import ICreateUserDTO from '@repositories/user-repository/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@repositories/user-repository/dtos/IUpdateUserDTO';
import IUserDTO from '@repositories/user-repository/dtos/IUserDTO';
import IUserPaginateDTO from '@repositories/user-repository/dtos/IUserPaginateDTO';

export default interface IUserService {
  getAllUsers(paginationParams: IPaginationParams): Promise<IUserPaginateDTO>;
  getUserById(userId: number): Promise<IUserDTO>;
  createUser(createUserDTO: ICreateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  updateUser(updateUserDTO: IUpdateUserDTO): Promise<void>;
}
