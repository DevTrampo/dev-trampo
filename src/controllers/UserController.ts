import UserRepository from '@repositories/user-repository/UserRepositoryImpl';
import { Request, Response } from 'express';
import InputValidator, { DataTypes } from '@common/utils/InputValidator';
import IUserService from '@services/user-service/UserServiceImpl';
import { HttpStatus } from '@common/utils/systemConstants';

export default class UserController {
  constructor(private readonly userService: IUserService) {}

  public async getAll(request: Request, respone: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) || 0 : 0;
    const perPage = request.query.perPage ? Number(request.query.perPage) || 15 : 15;
    const orderBy = request.query.orderBy ? String(request.query.orderBy) || null : null;

    const usersPaginated = await this.userService.getAllUsers({
      page,
      perPage,
      orderBy: orderBy ? orderBy.split(',') : [],
    });

    return respone.json(usersPaginated);
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAssign(id, {
      name: 'Id do usuário',
      varType: DataTypes.NUMBER,
    });

    const user = await this.userService.getUserById(id);
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    let { name, lastName, username, password, mail, title, about, birthday } = request.body;

    name = InputValidator.checkTypeAndAssign(name, { name: 'Nome do usuário' });
    lastName = InputValidator.checkTypeAndAssign(lastName, { name: 'Sobrenome do usuário' });
    username = InputValidator.checkTypeAndAssign(username, { name: 'Username do usuário' });
    password = InputValidator.checkTypeAndAssign(password, { name: 'Senha do usuário' });
    mail = InputValidator.checkTypeAndAssign(mail, { name: 'Email do usuário' });
    birthday = InputValidator.checkTypeAndAssign(birthday, {
      name: 'Data de aniversário do usuário',
    });
    title = InputValidator.checkTypeAndAssign(title, {
      name: 'Título do perfil do usuário',
      required: false,
    });
    about = InputValidator.checkTypeAndAssign(about, {
      name: 'Sessão "sobre" do usuário ',
      required: false,
    });

    await this.userService.createUser({
      name,
      title,
      lastName,
      username,
      password,
      mail,
      about,
      birthday,
    });

    return response.status(HttpStatus.CREATED).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let { name, lastName, username, password, mail, title, about, birthday } = request.body;
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAssign(id, {
      name: 'Id do usuário',
      varType: DataTypes.NUMBER,
    });
    name = InputValidator.checkTypeAndAssign(name, { name: 'Nome do usuário' });
    lastName = InputValidator.checkTypeAndAssign(lastName, { name: 'Sobrenome do usuário' });
    username = InputValidator.checkTypeAndAssign(username, { name: 'Username do usuário' });
    password = InputValidator.checkTypeAndAssign(password, { name: 'Senha do usuário' });
    mail = InputValidator.checkTypeAndAssign(mail, { name: 'Email do usuário' });
    birthday = InputValidator.checkTypeAndAssign(birthday, {
      name: 'Data de aniversário do usuário',
    });
    title = InputValidator.checkTypeAndAssign(title, {
      name: 'Título do perfil do usuário',
      required: false,
    });
    about = InputValidator.checkTypeAndAssign(about, {
      name: 'Sessão "sobre" do usuário ',
      required: false,
    });

    await this.userService.updateUser({
      userId: id,
      name,
      title,
      lastName,
      username,
      password,
      mail,
      about,
      birthday,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAssign(id, {
      name: 'Id do usuário',
      varType: DataTypes.NUMBER,
    });
    await this.userService.deleteUser(id);
    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
