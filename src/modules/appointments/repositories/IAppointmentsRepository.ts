import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  findByDate(Date: Date): Promise<Appointment | undefined>;
}
