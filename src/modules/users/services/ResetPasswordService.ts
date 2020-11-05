import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRopository from '../repositories/IUserTokensRopository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRopository: IUserTokensRopository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    console.log(' k kk k');

    const userToken = await this.userTokensRopository.findByToken(token);
    console.log(userToken);

    if (!userToken) {
      throw new AppError('User token not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    console.log(user);
    if (!user) {
      throw new AppError('User does not exits');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
