import { Message, User } from '../../entity';
import { logger, messageService, userService } from '../../services';
import { AppDataSource } from '../data-source';

export const seedMessages = async () => {
  const messageRepository = AppDataSource.getRepository(Message);
  const messagesExist = await messageRepository.count();

  if (messagesExist) {
    logger.info('"seedMessages" was skipped because messages already exist');
    return;
  }

  logger.info('"seedMessages" script started');

  const user1 = await userService.registration({
    first_name: 'Alex',
    last_name: 'Smith',
    email: 'alex@app.com',
    password: '12345678',
  });

  const user2 = await userService.registration({
    first_name: 'Olga',
    last_name: 'Maschenko',
    email: 'olga@app.com',
    password: '12345678',
  });

  const user3 = await userService.registration({
    first_name: 'Dan',
    last_name: 'Vasylchenko',
    email: 'dan@app.com',
    password: '12345678',
  });

  const user1Id = user1.user.user_id;
  const user2Id = user2.user.user_id;
  const user3Id = user2.user.user_id;

  //   texting between users: 1 - 2
  await messageService.create({
    sender: user1Id,
    receiver: user2Id,
    value: 'hello',
  });
  await messageService.create({
    sender: user2Id,
    receiver: user1Id,
    value: 'hi there!',
  });
  await messageService.create({
    sender: user1Id,
    receiver: user2Id,
    value: 'where have you been?',
  });
  await messageService.create({
    sender: user2Id,
    receiver: user1Id,
    value: 'what are you talking about?',
  });
  await messageService.create({
    sender: user1Id,
    receiver: user2Id,
    value: 'nevermind',
  });
  await messageService.create({
    sender: user2Id,
    receiver: user1Id,
    value: 'ok!',
  });

  //    texting between users: 1 - 3
  await messageService.create({
    sender: user1Id,
    receiver: user2Id,
    value: 'hello Dan!',
  });
  await messageService.create({
    sender: user3Id,
    receiver: user1Id,
    value: 'long time no see',
  });
  await messageService.create({
    sender: user1Id,
    receiver: user3Id,
    value: 'are you there?',
  });
  await messageService.create({
    sender: user3Id,
    receiver: user1Id,
    value: 'what do you mean?',
  });

  logger.info('"seedMessages" completed successfully!');
};
