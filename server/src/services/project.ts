import { AppDataSource } from '../database/data-source';
import { Architect, Executor, Project } from '../entity';
import { CreateProjectBody, UpdateProjectBody } from '../types';

class ProjectService {
  async getAll({
    limit,
    offset,
    executorId,
  }: {
    limit: number;
    offset: number;
    executorId?: number;
  }) {
    return await AppDataSource.getRepository(Project)
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.architects', 'architects')
      .select([
        'project.project_id AS project_id',
        'project.name AS name',
        'project.status AS status',
        'project.executor_id AS executor_id',
        'COUNT(architects) AS architectors_quantity',
      ])
      .where(executorId ? 'executor_id = :executorId' : 'TRUE', {
        executorId,
      })
      .groupBy('project.project_id')
      .addGroupBy('project.executor_id')
      .orderBy('project.project_id')
      .limit(limit)
      .offset(offset)
      .getRawMany();
  }

  async getOneById(id: number) {
    const projectRepository = await AppDataSource.getRepository(Project);
    return await projectRepository.findOneBy({ project_id: id });
  }

  async create(data: CreateProjectBody) {
    const executorRepository = await AppDataSource.getRepository(Executor);
    const architectRepository = await AppDataSource.getRepository(Architect);
    const projectRepository = await AppDataSource.getRepository(Project);

    const executor = await executorRepository.findOneBy({
      executor_id: data.executor_id || undefined,
    });
    const architects = await architectRepository.find({
      where: [
        ...(data.architects
          ? data.architects.map((id) => ({ architector_id: id }))
          : []),
      ],
    });

    const project = projectRepository.create({
      ...data,
      executor,
      architects: data.architects ? architects : null,
    });

    const result = await projectRepository.save(project);

    return result;
  }

  async updateOneById(id: number, data: UpdateProjectBody) {
    const architectRepository = await AppDataSource.getRepository(Architect);
    const executorRepository = await AppDataSource.getRepository(Executor);
    const projectRepository = await AppDataSource.getRepository(Project);

    const project = await projectRepository.findOneBy({ project_id: id });

    // TODO: ask about this condition
    if (!project) {
      throw new Error('Project with such id does not exist');
    }

    const executor = await executorRepository.findOneBy({
      executor_id: data.executor_id || undefined,
    });
    const architects = await architectRepository.find({
      where: [
        ...(data.architects
          ? data.architects.map((id) => ({ architector_id: id }))
          : []),
      ],
    });

    project.name = data.name ?? project.name;
    project.status = data.status ?? project.status;
    project.executor = executor ?? project.executor;
    project.architects = data.architects?.length
      ? architects
      : project.architects;

    const result = await projectRepository.save(project);
    return result;
  }

  async searchProductsByName({
    search,
    limit,
    offset,
  }: {
    search: string;
    limit: number;
    offset: number;
  }) {
    return await AppDataSource.getRepository(Project)
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.executor', 'executor')
      .select([
        'project.project_id AS project_id',
        'project.name AS name',
        'project.status AS status',
        'executor.executor_id AS executor_id',
      ])
      .where('project.name ilike :search', {
        search,
      })
      .orderBy('project.project_id')
      .limit(limit)
      .offset(offset)
      .getRawMany();
  }
}

export default new ProjectService();
