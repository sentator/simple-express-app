import { User } from '../../entity';
import { logger, userService } from '../../services';
import { AppDataSource } from '../data-source';

export const seedUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const usersExist = await userRepository.count();

  if (usersExist) {
    logger.info('"seedUsers" was skipped because users already exist');
    return;
  }

  logger.info('"seedUsers" script started');

  await userService.registration({
    first_name: 'Alex',
    last_name: 'Smith',
    email: 'user1@app.com',
    password: '12345678',
  });

  await userService.registration({
    first_name: 'Olga',
    last_name: 'Maschenko',
    email: 'user2@app.com',
    password: '12345678',
  });

  logger.info('"seedUsers" completed successfully!');
};
