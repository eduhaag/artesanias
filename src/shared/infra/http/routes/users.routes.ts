import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/CreateUser/CreateUserController';
import { DeleteUserController } from '@modules/users/useCases/DeleteUser/DeleteUserController';
import { ListUsersController } from '@modules/users/useCases/ListUsers/ListUsersController';
import { UpdateAdminFieldController } from '@modules/users/useCases/UpdateAdminField/UpdateAdminFieldController';
import { UpdateUserPasswordController } from '@modules/users/useCases/UpdateUserPassword/UpdateUserPasswordController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserPasswordController = new UpdateUserPasswordController();
const deleteUserController = new DeleteUserController();
const updateAdminFieldController = new UpdateAdminFieldController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/', listUsersController.handle);

usersRoutes.patch('/', updateUserPasswordController.handle);

usersRoutes.delete('/:id', deleteUserController.handle);

usersRoutes.patch('/admin', updateAdminFieldController.handle);

export { usersRoutes };
