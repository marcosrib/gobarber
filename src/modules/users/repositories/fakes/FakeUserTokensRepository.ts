import { v4 as uuid } from 'uuid';
import UserToken from '../../infra/typeorm/entities/Usertoken';
import IUserTokensRepository from '../IUserTokensRopository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);
    return userToken;
  }
}

export default FakeUserTokensRepository;
