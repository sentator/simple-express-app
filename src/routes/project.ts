import { Router } from 'express';
import { project } from '../controller';

const router = Router();

router.get('/', project.getProjects);
router.get('/search/:searchQuery?', project.getProjectsByName);

export default router;
