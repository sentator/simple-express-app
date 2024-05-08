import { Router } from 'express';
import projectsController from '../controller/projects.controller';

const router = Router();

router.get('/', projectsController.getProjects);
router.get('/search/:searchQuery?', projectsController.getProjectsByName);

export default router;
