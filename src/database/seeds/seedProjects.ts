import { Architect, Executor, Project } from '../../entity';
import { AppDataSource } from '../data-source';

export const seedProjects = async () => {
  const architectRepository = AppDataSource.getRepository(Architect);
  const executorRepository = AppDataSource.getRepository(Executor);
  const projectRepository = AppDataSource.getRepository(Project);

  const projectsExist = await projectRepository.count();

  if (projectsExist) {
    // eslint-disable-next-line
    console.log('"seedProjects" was skipped because projects already exist');
    return;
  }

  const architect1 = architectRepository.create({
    first_name: 'Vasya',
    last_name: 'Ponzi',
    email: 'vasya.ponzi@ukr.net',
    license: '123456-1234-123456',
  });
  await architectRepository.save(architect1);

  const architect2 = architectRepository.create({
    first_name: 'Yana',
    last_name: 'Omelyanenko',
    email: 'yana223@google.co.uk',
    license: '856418-2234-752451',
  });
  await architectRepository.save(architect2);

  const executor1 = executorRepository.create({
    first_name: 'Alex',
    last_name: 'Varta',
    email: 'alex.varta@ukr.net',
  });
  await executorRepository.save(executor1);

  const executor2 = executorRepository.create({
    first_name: 'Hanna',
    last_name: 'Varta',
    email: 'hanna.varta@ukr.net',
  });
  await executorRepository.save(executor2);

  const executor3 = executorRepository.create({
    first_name: 'Volodymyr',
    last_name: 'Bezruk',
    email: 'vvbez@ukr.net',
  });
  await executorRepository.save(executor3);

  const project1 = projectRepository.create({
    name: 'Project #1',
    status: 'not_started',
    executor: executor2,
    architects: [architect1],
  });
  await projectRepository.save(project1);

  const project2 = projectRepository.create({
    name: 'Project #322 v1',
    status: 'in_progress',
    executor: executor3,
    architects: [architect1, architect2],
  });
  await projectRepository.save(project2);

  // eslint-disable-next-line
  console.log('"seedProjects" completed successfully!');
};
