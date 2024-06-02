import { Router } from 'express';
import { project } from '../controller';

const router = Router();

router.get('/', project.getProjects);
router.post('/', project.createProject);
router.patch('/:id', project.updateProject);
router.get('/search', project.getProjectsByName);

export default router;
