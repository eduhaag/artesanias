import { Router } from 'express';

import { GetAddressByPostalCodeController } from '@modules/cep/GetAddressByPostalCodeController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { authenticateRoutes } from './authenticate.routes';
import { clientsRouter } from './clients.routes';
import { financialRouter } from './financialRoutes';
import { productModuleRouter } from './productsRoutes';
import { purchasesRouter } from './purchasesRoutes';
import { salesRouter } from './salesRoutes';
import { usersRoutes } from './users.routes';

const router = Router();

const getAddressByPostalCodeController = new GetAddressByPostalCodeController();

// Rota de login
router.use(authenticateRoutes);

// Rotas autenticadas
router.use(ensureAuthenticated);

// Rotas admin
router.use(ensureAdmin);
router.use('/users', usersRoutes);
router.use('/products', productModuleRouter);
router.use('/clients', clientsRouter);
router.use('/financial', financialRouter);
router.use('/sales', salesRouter);
router.use('/purchases', purchasesRouter);

router.get('/cep/:cep', getAddressByPostalCodeController.handle);

export { router };
