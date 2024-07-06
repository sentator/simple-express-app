import { Router } from 'express';
import { user } from '../controller';
import { validateBody } from '../middlewares';
import { registrationBodySchema, loginBodySchema } from '../schemas/user';

const router = Router();

router.post(
  '/registration',
  validateBody(registrationBodySchema),
  user.registration,
);
router.post('/login', validateBody(loginBodySchema), user.login);
router.post('/logout', user.logout);
router.get('/refresh', user.refresh);

export default router;
