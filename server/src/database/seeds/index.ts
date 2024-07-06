import { seedProjects } from './seedProjects';
import { seedUsers } from './seedUsers';
import { seedMessages } from './seedMessages';

export const runSeeds = async () => {
  await seedProjects();
  await seedUsers();
  await seedMessages();
};
