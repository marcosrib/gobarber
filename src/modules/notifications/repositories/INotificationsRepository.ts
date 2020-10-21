import ICreateNotificationsDTO from '../dtos/ICreateNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface IMotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
