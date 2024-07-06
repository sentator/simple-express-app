import { Router } from 'express';
import { message } from '../controller';
import { checkValidId, validateBody } from '../middlewares';
import { createMessageBodySchema } from '../schemas/message';

const router = Router();

router.get('/', message.getAll);
router.post('/', validateBody(createMessageBodySchema), message.create);
router.put(
  '/:id',
  checkValidId,
  validateBody(createMessageBodySchema),
  message.update,
);
router.delete('/:id', checkValidId, message.delete);

export default router;
