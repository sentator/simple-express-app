import { Request, Response } from 'express';
import db from '../database/index';
import { Project } from '../types';

class ProjectController {
  async getProjects(req: Request, res: Response) {
    const offset = req.query.offset ?? 0;
    const limit = req.query.limit ?? 100;
    const executorId = req.query.executor_id ?? null;

    try {
      const result = await db.query<Project[]>(
        'SELECT project_id, name, status, executor_id, COUNT(architector_id) AS architectors_quantity FROM projects LEFT JOIN projects_architects USING(project_id) WHERE (executor_id = $1 OR $1 IS NULL) GROUP BY project_id ORDER BY project_id LIMIT $2 OFFSET $3',
        [executorId, limit, offset],
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProjectsByName(req: Request, res: Response) {
    const offset = req.query.offset ?? 0;
    const limit = req.query.limit ?? 100;
    const search = req.params.searchQuery
      ? `%${req.params.searchQuery}%`
      : null;

    if (!search) {
      return res.status(400).json({ error: "Search query can't be empty" });
    }

    try {
      const result = await db.query<Omit<Project, 'architectors_quantity'>[]>(
        'SELECT project_id, name, status, executor_id FROM projects WHERE (name ILIKE $1 OR $1 IS NULL) ORDER BY project_id LIMIT $2 OFFSET $3',
        [search, limit, offset],
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ProjectController();
