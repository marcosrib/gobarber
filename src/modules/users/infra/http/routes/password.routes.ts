import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', ResetPasswordController.create);
export default passwordRouter;
