import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentesRouter = Router();

const appointmentsController = new AppointmentsController();

const providerAppointmentsController = new ProviderAppointmentsController();
appointmentesRouter.use(ensureAuthenticated);

appointmentesRouter.post('/', appointmentsController.create);

appointmentesRouter.get('/me', providerAppointmentsController.index);

export default appointmentesRouter;
