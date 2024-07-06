import { seedProjects } from './seedProjects';
import { seedUsers } from './seedUsers';

export const runSeeds = async () => {
  await seedProjects();
  await seedUsers();
};
