import { Router } from 'express';

import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

const appointmentesRouter = Router();

appointmentesRouter.use(ensureAuthenticated);

/* appointmentesRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentRepository();
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
}); */

appointmentesRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentRepository();
  const { provider_id, date } = request.body;

  const pasedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );
  const appointment = await createAppointment.execute({
    provider_id,
    date: pasedDate,
  });
  return response.json(appointment);
});

export default appointmentesRouter;
