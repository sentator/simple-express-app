import { Request, Response } from 'express';
import { CreateProjectBody, UpdateProjectBody } from '../types';
import { projectService } from '../services';

class ProjectController {
  async getProjects(req: Request, res: Response) {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 100;
    const executorId = Number(req.query.executor_id);

    try {
      const result = await projectService.getAll({ limit, offset, executorId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const body: CreateProjectBody = req.body;

      const result = await projectService.create(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const body: UpdateProjectBody = req.body;

      const project = await projectService.getOneById(id);

      if (!project) {
        return res
          .status(404)
          .json({ message: 'Project with the requested id does not exist' });
      }

      const result = await projectService.updateOneById(id, body);
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
      const result = await projectService.searchProductsByName({
        search,
        limit,
        offset,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ProjectController();
