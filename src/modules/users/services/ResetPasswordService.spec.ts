import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '12345',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '1234',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('1234');
    expect(updatedUser?.password).toBe('1234');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'kmkmkmkmk',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '12345',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custamDate = new Date();

      return custamDate.setHours(custamDate.getHours() + 3);
    });
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-exist-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
