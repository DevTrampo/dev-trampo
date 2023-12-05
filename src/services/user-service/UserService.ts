import AppException from '@common/exceptions/AppException';
import { formatErrorMessage } from '@common/utils/helpers';
import IUserRepository from '@repositories/user-repository/interfaces/IUserRepository';
import ICreateUserDTO from '@repositories/user-repository/dtos/ICreateUserDTO';
import IUserDTO from '@repositories/user-repository/dtos/IUserDTO';
import { UserErrorMessages } from 'src/constants/user-constants';
import IUserService from './interfaces/IUserService';
import IUpdateUserDTO from '@repositories/user-repository/dtos/IUpdateUserDTO';

export default class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  async deleteUser(userId: number): Promise<void> {
    const userExists = await this.userRepo.getUserById(userId);
    if (!userExists) {
      throw new AppException(formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]));
    }
    return this.userRepo.deleteUser(userId);
  }

  async updateUser(updateUserDTO: IUpdateUserDTO): Promise<void> {
    const userExists = await this.userRepo.getUserById(updateUserDTO.userId);
    if (!userExists) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [updateUserDTO.userId]),
      );
    }
    return this.userRepo.updateUser(updateUserDTO);
  }

  async getUserById(userId: number): Promise<IUserDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new AppException(formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]));
    }
    return user;
  }

  async createUser(createUserDTO: ICreateUserDTO): Promise<void> {
    const existsByEmail = await this.userRepo.existsByMail(createUserDTO.mail);

    return this.userRepo.createUser(createUserDTO);
  }
}
