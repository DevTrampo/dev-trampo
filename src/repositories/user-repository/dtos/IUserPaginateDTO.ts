import IPaginationParams from '@common/interfaces/IPaginationParams';
import IUser from '@models/IUser';

export default interface IUserPaginateDTO extends IPaginationParams {
  data: IUser[];
}
