import { Router } from 'express';

import { accountsRouter } from './accounts.routes';
import { ledgerRoutes } from './ledgers.routes';
import { statementsRoutes } from './statements.routes';

const financialRouter = Router();

financialRouter.use('/accounts', accountsRouter);
financialRouter.use('/ledgers', ledgerRoutes);
financialRouter.use('/statements', statementsRoutes);

export { financialRouter };
