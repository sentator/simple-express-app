import { Router } from 'express';
import usersController from '../controller/users.controller';
import { checkValidId } from '../middlewares';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:id', checkValidId, usersController.getUser);
router.put('/:id', checkValidId, usersController.updateUser);
router.patch('/:id', checkValidId, usersController.replaceUser);
router.delete('/:id', checkValidId, usersController.deleteUser);

export default router;
