import { Router } from 'express';
import { user } from '../controller';

const router = Router();

router.post('/registration', user.registration);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/refresh', user.refresh);

export default router;
