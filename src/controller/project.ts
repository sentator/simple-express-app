import { Request, Response } from 'express';
import { Architect, Executor, Project } from '../entity';
import { AppDataSource } from '../database/data-source';
import { CreateProjectBody, UpdateProjectBody } from '../types';

class ProjectController {
  async getProjects(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 100;
    const executorId = Number(req.query.executor_id);

    try {
      const result = await AppDataSource.getRepository(Project)
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
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const body: CreateProjectBody = req.body;

      const executorRepository = await AppDataSource.getRepository(Executor);
      const architectRepository = await AppDataSource.getRepository(Architect);
      const projectRepository = await AppDataSource.getRepository(Project);

      const executor = await executorRepository.findOneBy({
        executor_id: body.executor_id || undefined,
      });
      const architects = await architectRepository.find({
        where: [
          ...(body.architects
            ? body.architects.map((id) => ({ architector_id: id }))
            : []),
        ],
      });

      const project = projectRepository.create({
        ...body,
        executor,
        architects: body.architects ? architects : null,
      });

      const result = await projectRepository.save(project);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const body: UpdateProjectBody = req.body;

      const projectRepository = await AppDataSource.getRepository(Project);
      const project = await projectRepository.findOneBy({ project_id: id });

      if (!project) {
        return res.status(404).json({
          message: 'Project with the requested id does not exist',
        });
      }

      const executorRepository = await AppDataSource.getRepository(Executor);
      const executor = await executorRepository.findOneBy({
        executor_id: body.executor_id || undefined,
      });
      const architectRepository = await AppDataSource.getRepository(Architect);
      const architects = await architectRepository.find({
        where: [
          ...(body.architects
            ? body.architects.map((id) => ({ architector_id: id }))
            : []),
        ],
      });

      project.name = body.name ?? project.name;
      project.status = body.status ?? project.status;
      project.executor = executor ?? project.executor;
      project.architects = body.architects?.length
        ? architects
        : project.architects;

      const result = await projectRepository.save(project);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProjectsByName(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 100;
    const search = req.query.search ? `%${req.query.search}%` : null;

    if (!search) {
      return res.status(400).json({ error: "Search query can't be empty" });
    }

    try {
      const result = await AppDataSource.getRepository(Project)
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
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ProjectController();
