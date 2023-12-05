import IPaginationInfo from '@common/interfaces/IPaginationInfo';
import IUser from '@models/IUser';

export default interface IUserPaginateDTO extends IPaginationInfo {
  data: IUser[];
}
