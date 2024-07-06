import { Architect, Executor, Project } from '../../entity';
import { AppDataSource } from '../data-source';

AppDataSource.initialize().then(async () => {
  const architectRepository = AppDataSource.getRepository(Architect);
  const executorRepository = AppDataSource.getRepository(Executor);
  const projectRepository = AppDataSource.getRepository(Project);

  const architect1 = new Architect();
  architect1.first_name = 'Vasya';
  architect1.last_name = 'Ponzi';
  architect1.email = 'vasya.ponzi@ukr.net';
  architect1.license = '123456-1234-123456';
  await architectRepository.save(architect1);

  const architect2 = new Architect();
  architect2.first_name = 'Yana';
  architect2.last_name = 'Omelyanenko';
  architect2.email = 'yana223@google.co.uk';
  architect2.license = '856418-1234-123456';
  await architectRepository.save(architect2);

  const executor1 = new Executor();
  executor1.first_name = 'Alex';
  executor1.last_name = 'Varta';
  executor1.email = 'alex.varta@ukr.net';
  await executorRepository.save(executor1);

  const executor2 = new Executor();
  executor2.first_name = 'Hanna';
  executor2.last_name = 'Varta';
  executor2.email = 'hanna.varta@ukr.net';
  await executorRepository.save(executor2);

  const executor3 = new Executor();
  executor3.first_name = 'Volodymyr';
  executor3.last_name = 'Bezruk';
  executor3.email = 'vvbez@ukr.net';
  await executorRepository.save(executor3);

  const project1 = new Project();
  project1.name = 'Project #1';
  project1.status = 'not_started';
  project1.executor = executor2;
  project1.architects = [architect1];
  await projectRepository.save(project1);

  const project2 = new Project();
  project2.name = 'Project #322 v1';
  project2.status = 'in_progress';
  project2.executor = executor3;
  project2.architects = [architect1, architect2];
  await projectRepository.save(project2);

  // eslint-disable-next-line
  console.log('seeding completed!');
  await AppDataSource.destroy();
});
