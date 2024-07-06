import { Router } from 'express';
import { executor } from '../controller';

const router = Router();

router.get('/', executor.getExecutors);
router.post('/', executor.createExecutor);

export default router;
