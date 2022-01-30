import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { authenticateRoutes } from './authenticate.routes';
import { clientsRouter } from './clients.routes';
import { productModuleRouter } from './productsRoutes';
import { usersRoutes } from './users.routes';

const router = Router();

// Rota de login
router.use(authenticateRoutes);

// Rotas autenticadas
router.use(ensureAuthenticated);
router.use('/users', usersRoutes);
router.use('/products', productModuleRouter);
router.use('/clients', clientsRouter);

export { router };
