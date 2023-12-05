import UserRepository from '@repositories/user-repository/UserRepositoryImpl';
import { Request, Response } from 'express';
import InputValidator, { DataTypes } from '@common/utils/InputValidator';
import IUserService from '@services/user-service/UserService';
import { HttpStatus } from '@common/utils/systemConstants';

export default class UserController {
  constructor(private readonly userService: IUserService) {}

  public async getById(request: Request, response: Response) {
    let id = Number(request.params.id);
    id = InputValidator.checkTypeAndAssign(id, {
      name: 'Id do usuário',
      varType: DataTypes.NUMBER,
    });

    const user = await this.userService.getUserById(id);
    return response.json(user);
  }

  public async create(request: Request, response: Response) {
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

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
