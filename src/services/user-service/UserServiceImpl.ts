import AppException from '@common/exceptions/AppException';
import { formatErrorMessage } from '@common/utils/helpers';
import IUserRepository from '@repositories/user-repository/interfaces/IUserRepository';
import ICreateUserDTO from '@repositories/user-repository/dtos/ICreateUserDTO';
import IUserDTO from '@repositories/user-repository/dtos/IUserDTO';
import { UserErrorMessages } from 'src/constants/user-constants';
import IUserService from './interfaces/IUserService';
import IUpdateUserDTO from '@repositories/user-repository/dtos/IUpdateUserDTO';
import InputValidator from '@common/utils/InputValidator';
import { HttpStatus } from '@common/utils/systemConstants';
import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUserPaginateDTO from '@repositories/user-repository/dtos/IUserPaginateDTO';

export default class UserServiceImpl implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  public async getAllUsers(paginationParams: IPaginationParams): Promise<IUserPaginateDTO> {
    const users = await this.userRepo.getAllUsers(paginationParams);
    const totalUserCount = await this.userRepo.countUsers();
    if (users && users.length > 0) {
      return {
        currentPage: paginationParams.page,
        perPage: paginationParams.perPage,
        total: totalUserCount,
        data: users,
      };
    } else {
      throw new AppException(UserErrorMessages.USERS_NOT_FOUND);
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    const userExists = await this.userRepo.getUserById(userId);
    if (!userExists) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]),
        HttpStatus.NOT_FOUND,
      );
    }
    return this.userRepo.deleteUser(userId);
  }

  public async updateUser(updateUserDTO: IUpdateUserDTO): Promise<void> {
    InputValidator.validateDate(updateUserDTO.birthday.toString());

    const userExists = await this.userRepo.getUserById(updateUserDTO.userId);
    if (!userExists) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [updateUserDTO.userId]),
        HttpStatus.NOT_FOUND,
      );
    }

    const userByMail = await this.userRepo.getUserByMail(updateUserDTO.mail);
    if (userByMail && userByMail.userId !== updateUserDTO.userId) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [updateUserDTO.mail]),
        HttpStatus.CONFLICT,
      );
    }

    const userByUsername = await this.userRepo.getUserByUsername(updateUserDTO.username);
    if (userByUsername && userByUsername.userId !== updateUserDTO.userId) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_WITH_USERNAME_ALREDY_EXISTS, [
          updateUserDTO.username,
          HttpStatus.CONFLICT,
        ]),
      );
    }

    return this.userRepo.updateUser(updateUserDTO);
  }

  public async getUserById(userId: number): Promise<IUserDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_NOT_FOUND, [userId]),
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async createUser(createUserDTO: ICreateUserDTO): Promise<void> {
    InputValidator.validateDate(createUserDTO.birthday.toString());

    const existsByEmail = await this.userRepo.existsByMail(createUserDTO.mail);
    if (existsByEmail) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_WITH_MAIL_ALREDY_EXISTS, [createUserDTO.mail]),
        HttpStatus.CONFLICT,
      );
    }

    const existsByUsername = await this.userRepo.existsByUsername(createUserDTO.username);
    if (existsByUsername) {
      throw new AppException(
        formatErrorMessage(UserErrorMessages.USER_WITH_USERNAME_ALREDY_EXISTS, [
          createUserDTO.username,
        ]),
        HttpStatus.CONFLICT,
      );
    }

    return this.userRepo.createUser(createUserDTO);
  }
}
