import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('autenticateUser', () => {
  it('should be able to authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const autenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    const response = await autenticateUser.execute({
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authentocate winth non exist user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const autenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      autenticateUser.execute({
        email: 'marcos1@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const autenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    expect(
      autenticateUser.execute({
        email: 'marcos1@gmail.com',
        password: '123456frfrfrr',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
