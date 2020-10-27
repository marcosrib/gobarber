import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('ChacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: Request): Promise<Appointment[] | null> {
    const cacheData = await this.cacheProvider.recover('sss');
    console.log(cacheData);

    /*
      const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id: ,
          day,
          month,
          year,
        },
      ); */
    // await this.cacheProvider.save('sss', 'dd');

    return null;
  }
}

export default ListProviderAppointmentsService;
