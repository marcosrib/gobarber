import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentesRouter = Router();

const appointmentsController = new AppointmentsController();
appointmentesRouter.use(ensureAuthenticated);

appointmentesRouter.post('/', appointmentsController.create);

export default appointmentesRouter;
