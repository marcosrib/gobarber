import { Router } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentesRouter = Router();

appointmentesRouter.use(ensureAuthenticated);

/* appointmentesRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentRepository();
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
}); */

appointmentesRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const pasedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: pasedDate,
  });
  return response.json(appointment);
});

export default appointmentesRouter;
