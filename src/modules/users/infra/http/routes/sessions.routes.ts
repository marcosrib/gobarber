import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  console.log('mmmmm');

  const { email, password } = request.body;
  const autheticateUser = new AuthenticateUserService();

  const { user, token } = await autheticateUser.execute({
    email,
    password,
  });
  console.log(user);
  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
