import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'marcos',
      email: 'marcos1@gmail.com',
      password: '123456',
    });

    const upadateProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(upadateProfile.name).toBe('marcos');
    expect(upadateProfile.email).toBe('marcos1@gmail.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
