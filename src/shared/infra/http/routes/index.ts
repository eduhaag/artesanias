import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { authenticateRoutes } from './authenticate.routes';
import { clientsRouter } from './clients.routes';
import { financialRouter } from './financialRoutes';
import { productModuleRouter } from './productsRoutes';
import { salesRouter } from './salesRoutes';
import { usersRoutes } from './users.routes';

const router = Router();

// Rota de login
router.use(authenticateRoutes);

// Rotas autenticadas
router.use(ensureAuthenticated);
router.use('/users', usersRoutes);
router.use('/products', productModuleRouter);
router.use('/clients', clientsRouter);
router.use('/financial', financialRouter);
router.use('/sales', salesRouter);

export { router };
