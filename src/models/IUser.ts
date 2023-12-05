import IControlFields from '@common/interfaces/IControlFields';

export default interface IUser extends IControlFields {
  userId: number;
  name: string;
  lastName: string;
  username: string;
  password: string;
  mail: string;
  title: string;
  about: string;
  birthday: Date;
}
