import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(Date: Date): Promise<Appointment | undefined>;
}
