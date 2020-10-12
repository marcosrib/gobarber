import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    const upadateProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'marcosw',
      email: 'marcos@gmail.com',
    });

    expect(upadateProfile.name).toBe('marcosw');
    expect(upadateProfile.email).toBe('marcos@gmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'marcosw',
      email: 'marcos@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'marcos',
        email: 'marcos1@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    const upadateProfile = await updateProfileService.execute({
      user_id: user.id,
      name: 'marcosw',
      email: 'marcos@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(upadateProfile.password).toBe('123123');
  });

  it('should  not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'marcosw',
        email: 'marcos@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  not be able to update the password wit wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'marcosw',
        email: 'marcos@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able  update profile non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        email: 'marcos@gmail.com',
        name: 'marcos',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
