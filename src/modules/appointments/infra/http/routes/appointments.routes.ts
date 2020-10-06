import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentesRouter = Router();

const appointmentsController = new AppointmentsController();
appointmentesRouter.use(ensureAuthenticated);

/* appointmentesRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentRepository();
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
}); */

appointmentesRouter.post('/', appointmentsController.create);

export default appointmentesRouter;
