import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentesRouter = Router();

appointmentesRouter.use(ensureAuthenticated);

appointmentesRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentesRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const pasedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    provider_id,
    date: pasedDate,
  });
  return response.json(appointment);
});

export default appointmentesRouter;
