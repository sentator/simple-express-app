import { Router } from 'express';
import { message } from '../controller';

const router = Router();

router.get('/', message.getAll);
router.post('/', message.create);
router.put('/:id', message.update);
router.delete('/:id', message.delete);

export default router;
