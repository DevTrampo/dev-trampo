import IUser from '@models/IUser';

export interface IUserRepository {
  getUsers(): Promise<IUser[]>;
  getUserById(userId: number): Promise<IUser>;
}

export default class UserRepository implements IUserRepository {
  getUsers(): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: number): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
