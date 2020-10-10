import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
// import User from '../infra/typeorm/entities/User';
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EmailProvider')
    private emailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.emailProvider.sendMail(email, 'prdido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
