import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { ledgerRoutes } from './ledgers.routes';

const financialRouter = Router();

financialRouter.use('/accounts', accountsRouter);
financialRouter.use('/ledgers', ledgerRoutes);

export { financialRouter };
