import { Router } from 'express';
import { architect } from '../controller';

const router = Router();

router.get('/', architect.getArchitects);
router.post('/', architect.createArchitect);

export default router;
