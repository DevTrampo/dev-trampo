import IUser from '@models/IUser';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IPaginationParams from '@common/interfaces/IPaginationParams';

export default interface IUserRepository {
  getAllUsers(paginationParams: IPaginationParams): Promise<IUser[]>;
  getUserById(userId: number): Promise<IUser>;
  createUser(user: ICreateUserDTO): Promise<void>;
  updateUser(user: IUpdateUserDTO): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  countUsers(): Promise<number>;
  existsByMail(mail: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
  getUserByMail(mail: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
}
