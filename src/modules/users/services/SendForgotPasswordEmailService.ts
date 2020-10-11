import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRopository from '../repositories/IUserTokensRopository';

// import User from '../infra/typeorm/entities/User';
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private emailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokensRopository: IUserTokensRopository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('user does not exists.');
    }
    console.log(user);
    try {
      const { token } = await this.userTokensRopository.generate(user.id);
      console.log(token);
    } catch (error) {
      console.log(error);
    }

    await this.emailProvider.sendMail(email, 'prdido de recuperação de senha');
  }
}

export default SendForgotPasswordEmailService;
